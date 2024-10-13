import { UUID } from 'crypto';
import { BaseEntity } from 'src/core/base.entity';
import { Message } from 'src/modules/conversations/entities/message.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id!: number & { __brand: 'conversationId' };

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'int', nullable: true, default: null })
  product_id!: number & { __brand: 'productId' };

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product!: Product;

  @OneToMany(() => Message, (message) => message.conversation)
  messages!: Message[];

  @Column({ type: 'uuid', nullable: false })
  user_id!: UUID & { __brand: 'userId' };

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user!: User;

  @Column({ type: 'uuid', nullable: true, default: null })
  other_id!: UUID & { __brand: 'userId' };

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'other_id',
    referencedColumnName: 'id',
  })
  other!: User;
}
