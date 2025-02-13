import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Grocery } from '../grocery/grocery.entity';
import { Order } from '../order/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Grocery, Order])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
