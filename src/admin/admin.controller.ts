import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateGroceryDto } from '../grocery/dto/create-grocery.dto';
import { UpdateGroceryDto } from '../grocery/dto/update-grocery.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('add')
  @HttpCode(HttpStatus.CREATED) // Respond with a 201 status code
  async addGrocery(@Body() createGroceryDto: CreateGroceryDto) {
    await this.adminService.addGrocery(createGroceryDto);
    return {
      message: 'Grocery item successfully added!',
      status: HttpStatus.CREATED,
    };
  }

  @Get('view')
  @HttpCode(HttpStatus.OK) // Respond with a 200 status code
  async getAllGroceries() {
    const groceries = await this.adminService.getAllGroceries();
    return {
      message: 'All grocery items retrieved successfully.',
      status: HttpStatus.OK,
      data: groceries,
    };
  }

  @Delete('remove/:id')
  @HttpCode(HttpStatus.OK) // Respond with a 200 status code
  async removeGrocery(@Param('id') id: string) {
    const result = await this.adminService.removeGrocery(id);
    return {
      message: result.affected
        ? 'Grocery item removed successfully.'
        : 'Grocery item not found.',
      status: result.affected ? HttpStatus.OK : HttpStatus.NOT_FOUND,
    };
  }

  @Put('update/:id')
  @HttpCode(HttpStatus.OK) // Respond with a 200 status code
  async updateGrocery(
    @Param('id') id: string,
    @Body() updateGroceryDto: UpdateGroceryDto,
  ) {
    const updatedItem = await this.adminService.updateGrocery(
      parseInt(id),
      updateGroceryDto,
    );
    return {
      message: updatedItem
        ? 'Grocery item successfully updated.'
        : 'Grocery item not found.',
      status: updatedItem ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      data: updatedItem || null,
    };
  }
}
