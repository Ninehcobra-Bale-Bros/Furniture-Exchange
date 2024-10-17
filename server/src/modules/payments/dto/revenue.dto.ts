import { plainToClass, Transform } from 'class-transformer';
import { Account } from '../entities/account.entity';
import { UUID } from 'crypto';
import { Revenue } from '../entities/revenue.entity';

export class RevenueDto implements Readonly<RevenueDto> {
  id!: number & { __brand: 'revenueId' };

  total_revenue!: number;

  total_sales!: number;

  active!: boolean;

  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date;

  public static from(dto: Partial<RevenueDto>) {
    const it = new RevenueDto();

    return plainToClass(RevenueDto, it);
  }

  public static fromEntity(entity: Revenue) {
    return this.from({
      id: entity.id,
      total_revenue: entity.total_revenue,
      total_sales: entity.total_sales,
      active: entity.active,
      updated_at: entity.updated_at,
      created_at: entity.created_at,
      deleted_at: entity.deleted_at,
    });
  }

  public static toEntity(dto: Partial<RevenueDto>) {
    const it = new Revenue();

    it.total_revenue = dto.total_revenue;
    it.total_sales = dto.total_sales;
    it.active = dto.active;

    return it;
  }
}
