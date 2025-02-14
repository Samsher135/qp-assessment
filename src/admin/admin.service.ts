import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
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

  async removeGrocery(id: string): Promise<DeleteResult> {
    return await this.groceryRepository.delete(id);
  }

  async updateGrocery(
    id: number,
    updateGroceryDto: UpdateGroceryDto,
  ): Promise<Grocery | null> {
    const grocery = await this.groceryRepository.findOneBy({ id });
    if (!grocery) {
      return null;
    }

    // Update the grocery with the provided data
    await this.groceryRepository.update(id, updateGroceryDto);
    return this.groceryRepository.findOneBy({ id });
  }
}
