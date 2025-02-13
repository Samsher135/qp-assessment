import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('view')
  async getAllGroceries() {
    return this.userService.getAllGroceries();
  }

  @Post('order')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.userService.createOrder(
      createOrderDto.userId,
      createOrderDto.groceryItems,
    );
  }
}
