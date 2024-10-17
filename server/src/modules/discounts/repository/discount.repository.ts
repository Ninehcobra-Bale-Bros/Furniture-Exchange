import { GenericRepository } from 'src/core/generic.repository';
import { Discount } from '../entities/discount.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscountRepository extends GenericRepository<Discount> {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {
    super(discountRepository);
  }

  async findCompatibleDiscountByPrice(price: number): Promise<Discount> {
    return this.discountRepository
      .createQueryBuilder('discount')
      .where('discount.min_price <= :price', { price })
      .andWhere(
        new Brackets((qb) => {
          qb.where('discount.max_price IS NULL').orWhere(
            'discount.max_price >= :price',
            { price },
          );
        }),
      )
      .orderBy('discount.min_price', 'DESC')
      .getOne();
  }
}
