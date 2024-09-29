import { StateEnum, StatusEnum } from 'src/common/enums/product.enum';
import { BaseEntity } from 'src/core/base.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id!: number & { __brand: 'productId' };

  @ManyToOne(() => User, (user) => user.id)
  seller_id!: string;

  @ManyToOne(() => Category, (category) => category.id, {
    onDelete: 'CASCADE',
  })
  category_id!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description!: string;

  @Column({ type: 'text', nullable: false })
  images!: string[];

  @Column({ type: 'text', nullable: false })
  image_ids!: string[];

  @Column({ type: 'bigint', nullable: false })
  price!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  origin!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  address_line!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  district!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  province!: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    enumName: 'status',
    default: StatusEnum.PENDING,
  })
  status!: StatusEnum;

  @Column({
    type: 'enum',
    enum: StateEnum,
    enumName: 'state',
  })
  state!: StateEnum;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  expired_at!: Date;
}