import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grocery } from '../grocery/grocery.entity';
import { CreateGroceryDto } from '../grocery/dto/create-grocery.dto';
import { UpdateGroceryDto } from '../grocery/dto/update-grocery.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Grocery)
    private readonly groceryRepository: Repository<Grocery>,
  ) {}

  async addGrocery(createGroceryDto: CreateGroceryDto): Promise<Grocery> {
    const grocery = this.groceryRepository.create(createGroceryDto);
    return this.groceryRepository.save(grocery);
  }

  async getAllGroceries(): Promise<Grocery[]> {
    return this.groceryRepository.find();
  }

  async removeGrocery(id: string): Promise<void> {
    const result = await this.groceryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Grocery with ID ${id} not found`);
    }
  }

  async updateGrocery(
    id: number,
    updateGroceryDto: UpdateGroceryDto,
  ): Promise<Grocery | null> {
    const grocery = await this.groceryRepository.findOneBy({ id });
    if (!grocery) {
      throw new NotFoundException(`Grocery with ID ${id} not found`);
    }

    // Update the grocery with the provided data
    await this.groceryRepository.update(id, updateGroceryDto);
    return this.groceryRepository.findOneBy({ id });
  }
}
