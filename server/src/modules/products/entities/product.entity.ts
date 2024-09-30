import { Transform } from 'class-transformer';
import { UUID } from 'crypto';
import { StateEnum, StatusEnum } from 'src/common/enums/product.enum';
import { BaseEntity } from 'src/core/base.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id!: number & { __brand: 'productId' };

  @Column({ type: 'uuid', nullable: false })
  seller_id!: UUID & { __brand: 'userId' };

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({
    name: 'seller_id',
    referencedColumnName: 'id',
  })
  seller!: User;

  @Column({ type: 'int', nullable: false })
  category_id!: number & { __brand: 'categoryId' };

  @ManyToOne(() => Category, (category) => category.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
  })
  category!: Category;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  quantity!: number;

  @Column({ type: 'text', nullable: false })
  description!: string;

  @Column({ type: 'text', nullable: false })
  @Transform(
    ({ value }) => {
      return value.match(/"([^"]+)"/g).map((s) => s.replace(/"/g, ''));
    },
    { toClassOnly: true },
  )
  image_urls!: string[];

  @Column({ type: 'text', nullable: false })
  @Transform(
    ({ value }) => {
      return value.match(/"([^"]+)"/g).map((s) => s.replace(/"/g, ''));
    },
    { toClassOnly: true },
  )
  image_ids!: string[];

  @Column({ type: 'bigint', nullable: false })
  @Transform(({ value }) => Number(value))
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
