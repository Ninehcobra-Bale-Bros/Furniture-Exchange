import { Exclude, plainToClass, Transform } from 'class-transformer';
import { Account } from '../entities/account.entity';
import { UUID } from 'crypto';

export class AccountDto implements Readonly<AccountDto> {
  id!: UUID & { __brand: 'accountId' };

  user_id!: UUID & { __brand: 'userId' };

  @Transform(({ value }) => Number(value))
  balance!: number;
  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date;

  public static from(dto: Partial<AccountDto>) {
    const it = new AccountDto();

    it.id = dto.id;
    it.user_id = dto.user_id;
    it.balance = dto.balance;
    it.created_at = dto.created_at;
    it.updated_at = dto.updated_at;
    it.deleted_at = dto.deleted_at;

    return plainToClass(AccountDto, it);
  }

  public static fromEntity(entity: Account) {
    return this.from({
      id: entity.id,
      user_id: entity.user_id,
      balance: entity.balance,
      updated_at: entity.updated_at,
      created_at: entity.created_at,
      deleted_at: entity.deleted_at,
    });
  }

  public static toEntity(dto: Partial<AccountDto>) {
    const it = new Account();

    it.balance = dto.balance;
    it.user_id = dto.user_id;

    return it;
  }
}
