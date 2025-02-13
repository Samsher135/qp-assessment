// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { GroceryModule } from './grocery/grocery.module';
import { OrderModule } from './order/order.module';
import { Grocery } from './grocery/grocery.entity';
import { Order } from './order/order.entity';
import * as oracledb from 'oracledb';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        // Initialize Oracle DB with the correct Instant Client path
        await oracledb.initOracleClient({ libDir: process.env.ORACLE_LIB_DIR });

        return {
          type: 'oracle',
          username: process.env.DB_USER || 'test',
          password: process.env.DB_PASS || 'pass_123',
          connectString: process.env.DB_CONNECT_STRING || 'localhost:1521/xe',
          entities: [Grocery, Order],
          synchronize: true, // Set to false in production
        };
      },
    }),
    AdminModule,
    UserModule,
    GroceryModule,
    OrderModule,
  ],
})
export class AppModule {}
