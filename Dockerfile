# Stage 1: Oracle Instant Client Setup
FROM node:lts-slim AS oracle-setup

# Set Oracle Instant Client paths
ENV LD_LIBRARY_PATH=/usr/lib/oracle/19.25/client64/lib:${LD_LIBRARY_PATH:-} \
    PATH=/usr/lib/oracle/19.25/client64/bin:$PATH

# Set working directory
WORKDIR /opt/oracle

# Install necessary dependencies and download Oracle Instant Client
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libaio1 \
        wget \
        curl \
        alien \
        ca-certificates && \
    wget --no-check-certificate -O oracle-instantclient-basic.rpm \
        https://download.oracle.com/otn_software/linux/instantclient/1925000/oracle-instantclient19.25-basic-19.25.0.0.0-1.x86_64.rpm && \
    wget --no-check-certificate -O oracle-instantclient-sqlplus.rpm \
        https://download.oracle.com/otn_software/linux/instantclient/1925000/oracle-instantclient19.25-sqlplus-19.25.0.0.0-1.x86_64.rpm && \
    alien --to-deb --scripts oracle-instantclient-basic.rpm && \
    alien --to-deb --scripts oracle-instantclient-sqlplus.rpm && \
    dpkg -i oracle-instantclient19.25-basic_19.25.0.0.0-2_amd64.deb && \
    dpkg -i oracle-instantclient19.25-sqlplus_19.25.0.0.0-2_amd64.deb && \
    rm -rf /opt/oracle/*.rpm /opt/oracle/*.deb && \
    apt-get remove -y alien && apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*


# Stage 2: Application Build
FROM node:lts-slim AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage caching
COPY package*.json ./ 

# Install dependencies
RUN npm ci --omit=dev

# Copy the rest of the application
COPY . .

# Install NestJS CLI
RUN npm install -g @nestjs/cli

# Build the application
RUN npm run build

# Stage 3: Application Runtime
FROM node:lts-slim AS runner

WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

# Copy Oracle Instant Client from the oracle-setup stage
COPY --from=oracle-setup /usr/lib/oracle /usr/lib/oracle

# install libaio1
RUN apt-get update && apt-get install -y libaio1

# Set environment variables
ENV NODE_ENV=production \
    LD_LIBRARY_PATH=/usr/lib/oracle/19.25/client64/lib:${LD_LIBRARY_PATH} \
    PATH=/usr/lib/oracle/19.25/client64/bin:${PATH}

# Expose the necessary port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]