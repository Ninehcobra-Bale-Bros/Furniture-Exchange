import { Module } from '@nestjs/common';
import { DiscountService } from './discounts.service';
import { DiscountController } from './discounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { DiscountRepository } from './repository/discount.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Discount])],
  controllers: [DiscountController],
  providers: [DiscountService, DiscountRepository],
})
export class DiscountModule {}
