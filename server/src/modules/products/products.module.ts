import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './repository/product.repository';
import { DiscountModule } from '../discounts/discounts.module';
import { CloudinaryModule } from 'src/config/upload/cloudinary.module';
import { PaymentsModule } from 'src/modules/payments/payments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    DiscountModule,
    CloudinaryModule,
    PaymentsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
  exports: [ProductsService],
})
export class ProductsModule {}
