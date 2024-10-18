import { plainToClass, Transform } from 'class-transformer';
import { Account } from '../../payments/entities/account.entity';
import { UUID } from 'crypto';
import { Revenue } from '../entities/revenue.entity';

export class RevenueDto implements Readonly<RevenueDto> {
  id!: number & { __brand: 'revenueId' };

  account_id!: number & { __brand: 'accountId' };

  @Transform(({ value }) => Number(value))
  total_revenue!: number;

  @Transform(({ value }) => Number(value))
  total_sales!: number;

  @Transform(({ value }) => Number(value))
  profit: number;

  active!: boolean;

  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date;

  public static from(dto: Partial<RevenueDto>) {
    const it = new RevenueDto();

    it.id = dto.id;
    it.account_id = dto.account_id;
    it.total_revenue = dto.total_revenue;
    it.total_sales = dto.total_sales;
    it.profit = dto.profit;
    it.active = dto.active;
    it.updated_at = dto.updated_at;
    it.created_at = dto.created_at;
    it.deleted_at = dto.deleted_at;

    return plainToClass(RevenueDto, it);
  }

  public static fromEntity(entity: Revenue) {
    return this.from({
      id: entity.id,
      account_id: entity.account_id,
      total_revenue: entity.total_revenue,
      total_sales: entity.total_sales,
      profit: entity.profit,
      active: entity.active,
      updated_at: entity.updated_at,
      created_at: entity.created_at,
      deleted_at: entity.deleted_at,
    });
  }

  public static toEntity(dto: Partial<RevenueDto>) {
    const it = new Revenue();

    it.account_id = dto.account_id;
    it.total_revenue = 0;
    it.total_sales = 0;
    it.profit = 0;
    it.active = true;

    return it;
  }
}
