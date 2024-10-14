import { Transform } from 'class-transformer';
import { BaseEntity } from 'src/core/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { TransactionStatusEnum } from 'src/common/enums/transaction.enum';
import { UUID } from 'crypto';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'transactionId' };

  @Column({ type: 'uuid', nullable: false })
  account_id!: UUID & { __brand: 'accountId' };

  @Column({ type: 'bigint', nullable: false })
  amount!: number;

  @Column({
    type: 'enum',
    enum: TransactionStatusEnum,
    nullable: false,
    default: TransactionStatusEnum.PENDING,
  })
  status: TransactionStatusEnum;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  updated_at!: Date;

  @ManyToOne(() => Account, (account) => account.id, { nullable: true })
  @JoinColumn({ name: 'account_id' })
  account!: Account;
}
