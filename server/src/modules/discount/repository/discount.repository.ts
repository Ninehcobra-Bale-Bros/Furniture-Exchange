import { GenericRepository } from 'src/core/generic.repository';
import { Discount } from '../entities/discount.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class DiscountRepository extends GenericRepository<Discount> {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {
    super(discountRepository);
  }
}
