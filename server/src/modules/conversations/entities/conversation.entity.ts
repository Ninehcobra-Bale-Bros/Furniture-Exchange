import { UUID } from 'crypto';
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
} from 'typeorm';

@Entity()
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id!: number & { __brand: 'conversationId' };

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  product_id!: number & { __brand: 'productId' };

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product!: Product;

  @Column({ type: 'uuid', nullable: false })
  seller_id!: UUID & { __brand: 'userId' };

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'seller_id',
    referencedColumnName: 'id',
  })
  seller!: User;

  @Column({ type: 'uuid', nullable: false })
  other_id!: UUID & { __brand: 'userId' };

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'other_id',
    referencedColumnName: 'id',
  })
  other!: User;
}
