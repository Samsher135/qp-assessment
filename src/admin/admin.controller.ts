import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateGroceryDto } from '../grocery/dto/create-grocery.dto';
import { UpdateGroceryDto } from '../grocery/dto/update-grocery.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('add')
  async addGrocery(@Body() createGroceryDto: CreateGroceryDto) {
    return this.adminService.addGrocery(createGroceryDto);
  }

  @Get('view')
  async getAllGroceries() {
    return this.adminService.getAllGroceries();
  }

  @Delete('remove/:id')
  async removeGrocery(@Param('id') id: string) {
    return this.adminService.removeGrocery(id);
  }

  @Put('update/:id')
  async updateGrocery(
    @Param('id') id: string,
    @Body() updateGroceryDto: UpdateGroceryDto,
  ) {
    return this.adminService.updateGrocery(parseInt(id), updateGroceryDto);
  }
}
