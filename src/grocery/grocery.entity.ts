import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('grocery')
export class Grocery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  inventory: number;
}
