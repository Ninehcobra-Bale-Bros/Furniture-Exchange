import { UUID } from 'crypto';
import { DeliveryStatusEnum } from 'src/common/enums/delivery.enum';
import { BaseEntity } from 'src/core/base.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // ES 2015
import timezone from 'dayjs/plugin/timezone'; // ES 2015
import { Transform } from 'class-transformer';
dayjs.extend(utc);
dayjs.extend(timezone);

@Entity()
export class Delivery extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id: number & { __brand: 'deliveryId' };

  @Column({ type: 'uuid', nullable: false })
  user_id: UUID & { __brand: 'userId' };

  @Column({ type: 'uuid', nullable: false })
  other_id: UUID & { __brand: 'userId' };

  @Column({ type: 'uuid', nullable: true })
  deliver_id: UUID & { __brand: 'userId' };

  @Column({ type: 'int', nullable: false })
  product_id: number;

  @Column({ type: 'text', nullable: false })
  other_fullname: string;

  @Column({ type: 'text', nullable: false })
  other_phone: string;

  @Column({ type: 'bool', default: false })
  other_confirmed: boolean;

  @Column({ type: 'text', nullable: false })
  pickup_address: string;

  @Column({ type: 'text', nullable: false })
  delivery_address: string;

  @Column({ type: 'int', nullable: false })
  amount: number;

  @Column({ type: 'int', nullable: false, default: 1 })
  quantity: number;

  @Column({ type: 'decimal', nullable: false, default: 0 })
  shipping_fee: number;

  @Column({ type: 'decimal', nullable: true, default: null })
  total: number;

  @Column({
    type: 'enum',
    enum: DeliveryStatusEnum,
    name: 'status',
    default: DeliveryStatusEnum.PENDING,
  })
  status: DeliveryStatusEnum;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  expired_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  setExpirationDate() {
    const dateTime = new Date(
      dayjs().add(1, 'day').tz('Asia/Bangkok').format('YYYY/MM/DD hh:mm:ss A'),
    );

    this.expired_at = dateTime;
  }

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;

  @JoinColumn({ name: 'other_id' })
  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  other: User;

  @JoinColumn({ name: 'deliver_id' })
  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  deliver: User;

  @JoinColumn({ name: 'product_id' })
  @ManyToOne(() => Product, (product) => product.id, { nullable: false })
  product: Product;
}
