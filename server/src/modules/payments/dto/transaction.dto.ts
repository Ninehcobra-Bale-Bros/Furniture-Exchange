import { plainToClass } from 'class-transformer';
import { Account } from '../entities/account.entity';
import { UUID } from 'crypto';
import { Transaction } from '../entities/transaction.entity';
import { TransactionStatusEnum } from 'src/common/enums/transaction.enum';

export class TransactionDto implements Readonly<TransactionDto> {
  id: string & { __brand: 'transactionId' };
  account_id: UUID & { __brand: 'accountId' };
  amount: number;
  status: TransactionStatusEnum;
  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date;

  public static from(dto: Partial<TransactionDto>) {
    const it = new TransactionDto();

    it.id = dto.id;
    it.account_id = dto.account_id;
    it.amount = dto.amount;
    it.status = dto.status;
    it.created_at = dto.created_at;
    it.updated_at = dto.updated_at;
    it.deleted_at = dto.deleted_at;

    return plainToClass(TransactionDto, it);
  }

  public static fromEntity(entity: Transaction) {
    return this.from({
      id: entity.id,
      account_id: entity.account_id,
      amount: entity.amount,
      status: entity.status,
      updated_at: entity.updated_at,
      created_at: entity.created_at,
      deleted_at: entity.deleted_at,
    });
  }

  public static toEntity(dto: Partial<TransactionDto>) {
    const it = new Transaction();

    it.amount = dto.amount;
    it.account_id = dto.account_id;
    it.status = dto.status;

    return it;
  }
}
