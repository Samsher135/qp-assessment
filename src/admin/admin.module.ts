import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Grocery } from '../grocery/grocery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grocery])], // ✅ Ensure Grocery entity is registered
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
