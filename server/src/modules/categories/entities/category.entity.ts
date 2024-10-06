import { Transform } from 'class-transformer';
import { BaseEntity } from 'src/core/base.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @Column({ type: 'varchar', nullable: false, default: '' })
  image_url!: string;

  @Column({ type: 'varchar', default: '' })
  slug!: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  order!: number;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[]; // Relation to products

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;
}
