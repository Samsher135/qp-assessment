# Grocery Booking API

A simple API to manage and book grocery items. This project is built with **NestJS** and uses **TypeORM** for database interaction with **Oracle** as the database. It provides two types of roles:

- **Admin**: Manages grocery items and inventory.
- **User**: Browses available grocery items and places orders.

## Features

### Admin Features
- **Add, update, view, and remove grocery items.**
- **Manage inventory levels.**

### User Features
- **View available grocery items.**
- **Book multiple grocery items in a single order.**

## Technologies Used

- **NestJS**: Framework for building the API.
- **TypeORM**: ORM for interacting with the Oracle database.
- **Oracle Database**: Database for storing grocery items and orders.
- **Docker**: Containerization for easier deployment and scaling.

## Getting Started

### Prerequisites

Before getting started, make sure you have the following tools installed:

- **Node.js** (v16 or above)
- **Docker** (for containerization)
- **Docker Compose** (for managing multi-container Docker applications)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/grocery-booking-api.git
   cd grocery-booking-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the environment:**
   Create a `.env` file in the root directory and configure your Oracle DB credentials:
   ```env
   DB_USER=MY_AP
   DB_PASS=MY_AP_123
   DB_CONNECT_STRING=localhost:1548/MY206DEV
   ```

4. **Build and run the application with Docker:**
   To start both the NestJS app and Oracle database using Docker, run:
   ```bash
   docker-compose up --build
   ```
   This will:
   - Start the application on `http://localhost:3000`
   - Start the Oracle database on `localhost:1521`

   You can now access the API at `http://localhost:3000`.

## API Endpoints

### Admin Endpoints

#### 1. **Add New Grocery Item**
- **Endpoint**: `POST /admin/add`
- **Request Body:**
  ```json
  {
    "name": "Tomato",
    "price": 2.5,
    "inventory": 100
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "name": "Tomato",
    "price": 2.5,
    "inventory": 100
  }
  ```

#### 2. **View All Grocery Items**
- **Endpoint**: `GET /admin/view`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "Tomato",
      "price": 2.5,
      "inventory": 100
    },
    {
      "id": 2,
      "name": "Cucumber",
      "price": 1.5,
      "inventory": 50
    }
  ]
  ```

#### 3. **Remove Grocery Item**
- **Endpoint**: `DELETE /admin/remove/:id`
- **Path Parameter**: `id` (integer) – ID of the grocery item to remove.
- **Response:**
  ```json
  {
    "message": "Grocery item removed successfully"
  }
  ```

#### 4. **Update Grocery Item**
- **Endpoint**: `PUT /admin/update/:id`
- **Request Body:**
  ```json
  {
    "name": "Tomato",
    "price": 3.0,
    "inventory": 120
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "name": "Tomato",
    "price": 3.0,
    "inventory": 120
  }
  ```

### User Endpoints

#### 1. **View All Grocery Items**
- **Endpoint**: `GET /user/view`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "Tomato",
      "price": 2.5,
      "inventory": 100
    },
    {
      "id": 2,
      "name": "Cucumber",
      "price": 1.5,
      "inventory": 50
    }
  ]
  ```

#### 2. **Place an Order**
- **Endpoint**: `POST /user/order`
- **Request Body:**
  ```json
  {
    "userId": 1,
    "groceryItems": [1, 2, 3]
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "userId": 1,
    "groceryItems": ["1", "2", "3"],
    "totalPrice": 6.5,
    "createdAt": "2025-02-13T10:00:00Z"
  }
  ```

---

## Docker Setup

To run the application and Oracle DB in Docker containers:

1. **Start the containers:**
   ```bash
   docker-compose up --build
   ```

2. **Access the API** at `http://localhost:3000`.

---

## Running Locally Without Docker

If you prefer to run the app locally without Docker, follow these steps:

1. **Install Oracle Database** or use an Oracle cloud instance.
2. **Update the `.env` file** with the correct Oracle DB credentials.
3. **Run the application**:
   ```bash
   npm run start:dev
   ```

---

## Development

If you wish to contribute or modify the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/grocery-booking-api.git
   ```

2. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/new-feature
   ```

3. **Make your changes** and **commit**:
   ```bash
   git commit -m "Add new feature"
   ```

4. **Push your changes**:
   ```bash
   git push origin feature/new-feature
   ```
---