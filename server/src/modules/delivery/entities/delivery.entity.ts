import { UUID } from 'crypto';
import { DeliveryStatus } from 'src/common/enums/delivery.enum';
import { BaseEntity } from 'src/core/base.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Delivery extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id: number & { __brand: 'deliveryId' };

  @Column({ type: 'uuid', nullable: false })
  user_id: UUID & { __brand: 'userId' };

  @Column({ type: 'uuid', nullable: false })
  other_id: UUID & { __brand: 'userId' };

  @Column({ type: 'uuid', nullable: true })
  delivery_id: UUID & { __brand: 'userId' };

  @Column({ type: 'int', nullable: false })
  product_id: number;

  @Column({ type: 'text', nullable: false })
  pickup_address: string;

  @Column({ type: 'text', nullable: false })
  delivery_address: string;

  @Column({ type: 'int', nullable: false })
  amount: number;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
    name: 'status',
    default: DeliveryStatus.PENDING,
  })
  status: DeliveryStatus;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;

  @JoinColumn({ name: 'other_id' })
  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  other: User;

  @JoinColumn({ name: 'delivery_id' })
  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  delivery: User;

  @JoinColumn({ name: 'product_id' })
  @OneToOne(() => Product, (product) => product.id, { nullable: false })
  product: Product;
}
