import { GenericRepository } from 'src/core/generic.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Revenue } from '../entities/revenue.entity';

export class RevenueRepository extends GenericRepository<Revenue> {
  constructor(@InjectRepository(Revenue) private readonly revenueRepository) {
    super(revenueRepository);
  }
}
