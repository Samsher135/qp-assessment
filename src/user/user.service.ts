import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grocery } from '../grocery/grocery.entity';
import { Order } from '../order/order.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Grocery)
    private readonly groceryRepository: Repository<Grocery>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAllGroceries(): Promise<Grocery[]> {
    return this.groceryRepository.find();
  }

  // Method to create an order
  async createOrder(userId: number, groceryItemIds: number[]): Promise<Order> {
    const groceries = await this.groceryRepository.findByIds(groceryItemIds);

    if (groceries.length !== groceryItemIds.length) {
      throw new Error('Some grocery items not found');
    }

    // Calculate the total price and reduce inventory
    let totalPrice = 0;
    for (const grocery of groceries) {
      if (grocery.inventory <= 0) {
        throw new Error(`Item ${grocery.name} is out of stock`);
      }
      totalPrice += grocery.price;
      grocery.inventory -= 1; // Reduce the inventory
      await this.groceryRepository.save(grocery); // Update inventory in the DB
    }

    // Create the order in the database
    const order = this.orderRepository.create({
      userId,
      groceryItems: groceryItemIds.map((id) => id.toString()), // Store grocery IDs as strings
      totalPrice,
    });

    return this.orderRepository.save(order);
  }
}
