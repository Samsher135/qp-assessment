// src/user/dto/create-order.dto.ts
export class CreateOrderDto {
  userId: number;
  groceryItems: number[]; // Array of grocery item IDs
}
