import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { RevenueRepository } from './repository/revenue.repository';
import { RevenueDto } from './dto/revenue.dto';
import * as fs from 'fs';
import * as path from 'path';
import { plainToClass } from 'class-transformer';
import { PaymentsService } from './payments.service';
import { UUID } from 'crypto';
import { Delivery } from '../delivery/entities/delivery.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class RevenuesService {
  constructor(
    private readonly revenueRepository: RevenueRepository,
    private readonly paymentsService: PaymentsService,
    private readonly productsService: ProductsService,
  ) {}

  async createRevenue(dto: CreateRevenueDto) {
    const revenue = await this.revenueRepository
      .save(RevenueDto.toEntity(dto))
      .then((res) => RevenueDto.fromEntity(res));

    return revenue;
  }

  async updateRevenue(sellerId: string, delivery: Delivery) {
    const account = await this.paymentsService.findAccountByUserId(sellerId);

    if (!account) {
      throw new InternalServerErrorException('Account not found');
    }

    const revenue = await this.revenueRepository.findOneBy({
      where: {
        account_id: account.id as any,
      },
    });

    if (!revenue) {
      throw new InternalServerErrorException('Revenue not found');
    }

    const totalRevenue =
      Number(revenue.total_revenue) +
      Number(delivery.amount) * delivery.quantity;
    const totalSales = Number(revenue.total_sales) + Number(delivery.quantity);

    const updatedRevenue = await this.revenueRepository.update(
      revenue.id as any,
      {
        total_revenue: totalRevenue,
        total_sales: totalSales,
      },
    );

    this.updateRevenueAdmin(delivery);

    return revenue;
  }

  async updateRevenueAdmin(delivery: Delivery) {
    const product = await this.productsService.findById(
      delivery.product_id.toString(),
    );

    const discount = await this.productsService.findAppropriateDiscount(
      product.price,
    );

    if (!discount) {
      throw new InternalServerErrorException('Discount not found');
    }

    if (!product) {
      throw new InternalServerErrorException('Product not found');
    }

    const adminRevenue = await this.revenueRepository.findOneBy({
      where: {
        account_id: 'cfb77620-51eb-4c75-a857-5f9c4208cc03' as any,
      },
    });

    if (!adminRevenue) {
      throw new InternalServerErrorException('Admin revenue not found');
    }

    let totalRevenue =
      (Number(product.price) +
        Number(product.price) * discount.discount_percent) *
      delivery.quantity;

    let profit = product.price * discount.discount_percent * delivery.quantity;

    console.log('Product Price: ', product.price);
    console.log('Discount Percent: ', discount.discount_percent);
    console.log('Quantity: ', delivery.quantity);
    console.log('Total Revenue: ', totalRevenue);
    console.log('Profit: ', profit);

    this.revenueRepository.update(adminRevenue.id as any, {
      total_revenue: Number(adminRevenue.total_revenue) + Number(totalRevenue),
      total_sales: Number(adminRevenue.total_sales) + Number(delivery.quantity),
      profit: adminRevenue.profit + Number(profit),
    });

    return adminRevenue;
  }

  async writeToFile() {
    console.log('Write to file');

    const revenues = await this.revenueRepository.findAll().then((res) => {
      return res.map((revenue) => plainToClass(RevenueDto, revenue));
    });

    const filePath = path.resolve('db/seeds/revenues/revenues.json');

    fs.writeFile(filePath, JSON.stringify(revenues), (err) => {
      if (err) {
        throw new InternalServerErrorException(
          `Error writing to file: ${err.message}`,
        );
      }
    });

    return 'Write to file successfully';
  }
}
