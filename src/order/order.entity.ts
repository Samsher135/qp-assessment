import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column('simple-array')
  groceryItems: string[];

  @Column('decimal')
  totalPrice: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
