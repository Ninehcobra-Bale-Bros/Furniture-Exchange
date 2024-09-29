import { BaseEntity } from 'src/core/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Discount extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id!: number & { __brand: 'discountId' };

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'bigint', nullable: false })
  min_price!: number;

  @Column({ type: 'bigint', nullable: true })
  max_price!: number;

  @Column({ type: 'float', nullable: false })
  discount_percent!: number;

  @Column({ type: 'int', default: 0 })
  order!: number;
}
