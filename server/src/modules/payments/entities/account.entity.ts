import { Transform } from 'class-transformer';
import { UUID } from 'crypto';
import { BaseEntity } from 'src/core/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transaction } from './transaction.entity';
import { Revenue } from './revenue.entity';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: UUID & { __brand: 'accountId' };

  @Column({ type: 'uuid', nullable: false })
  user_id!: UUID & { __brand: 'userId' };

  @Column({ type: 'int', nullable: true, default: null })
  revenue_id!: number & { __brand: 'revenueId' };

  @Column({ type: 'decimal', default: 0 })
  balance!: number;

  @UpdateDateColumn({ type: 'varchar', nullable: false })
  updated_at!: Date;

  @OneToOne(() => User, (user) => user.account, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToOne(() => Revenue, (revenue) => revenue.account, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'revenue_id' })
  revenue!: Revenue;

  @OneToMany(() => Transaction, (transaction) => transaction.account_id, {
    onDelete: 'CASCADE',
  })
  transactions!: Transaction[];
}
