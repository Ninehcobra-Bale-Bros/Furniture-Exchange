import { BaseEntity } from 'src/core/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id!: number & { __brand: 'categoryId' };

  @Column({ type: 'int', nullable: true })
  parent_id!: number & { __brand: 'categoryId' };

  @ManyToOne(() => Category, (category) => category.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'parent_id',
    referencedColumnName: 'id',
  })
  parent!: Category | null;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'text', nullable: false })
  description!: string; // Changed to 'text' for more flexibility

  @Column({ type: 'int', nullable: false, default: 0 })
  order!: number;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;
}
