import { BaseEntity } from 'src/core/base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number & { __brand: 'categoryId' };

  @ManyToOne(() => Category, (category) => category.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parent_id: number | (null & { __brand: 'categoryId' });

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'text', nullable: false })
  description!: string; // Changed to 'text' for more flexibility

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;
}
