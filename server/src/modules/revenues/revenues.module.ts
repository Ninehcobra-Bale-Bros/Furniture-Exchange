import { Module } from '@nestjs/common';
import { RevenuesService } from './revenues.service';
import { RevenuesController } from './revenues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revenue } from './entities/revenue.entity';
import { PaymentsModule } from '../payments/payments.module';
import { ProductsModule } from '../products/products.module';
import { RevenueRepository } from './repository/revenue.repository';
import { DeliveryModule } from '../delivery/delivery.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Revenue]),
    PaymentsModule,
    ProductsModule,
    DeliveryModule,
  ],
  controllers: [RevenuesController],
  providers: [RevenuesService, RevenueRepository],
  exports: [RevenuesService],
})
export class RevenuesModule {}
