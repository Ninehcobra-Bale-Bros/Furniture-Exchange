import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateRevenueDto } from './dtos/create-revenue.dto';
import { OnEvent } from '@nestjs/event-emitter';
import { RevenueDto } from './dtos/revenue.dto';
import { Delivery } from '../delivery/entities/delivery.entity';
import { User } from '../users/entities/user.entity';
import { plainToClass } from 'class-transformer';
import * as fs from 'fs';
import * as path from 'path';
import { RevenueRepository } from './repository/revenue.repository';
import { PaymentsService } from '../payments/payments.service';
import { ProductsService } from '../products/products.service';
import { DeliveryStatusEnum } from 'src/common/enums/delivery.enum';
import OnDeliveringEvent from '../delivery/events/delivery-delivering.event';
import OnDeliveredEvent from '../delivery/events/delivery-delivered.event';
import OnReturnedEvent from '../delivery/events/delivery-returned.event';
import { DeliveryService } from '../delivery/delivery.service';
import { DeliveryDto } from '../delivery/dto/delivery.dto';
import { GetRevenueChartDto } from './dtos/get-revenue-chart.dto';

@Injectable()
export class RevenuesService {
  constructor(
    private readonly revenueRepository: RevenueRepository,
    private readonly paymentsService: PaymentsService,
    private readonly productsService: ProductsService,
    private readonly deliveryService: DeliveryService,
  ) {}

  async createRevenue(dto: CreateRevenueDto) {
    const revenue = await this.revenueRepository
      .save(RevenueDto.toEntity(dto))
      .then((res) => RevenueDto.fromEntity(res));

    return revenue;
  }

  async updateRevenue(sellerId: string, delivery: DeliveryDto) {
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

  async updateRevenueAdmin(delivery: DeliveryDto) {
    const SELLER_ID = 'd8334efe-45cc-455a-92c1-1f34a65cc942' as any;

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
      Number(product.price) *
      (delivery.user_id === SELLER_ID ? 0.7 : discount.discount_percent) *
      delivery.quantity;

    let profit =
      product.price *
      (delivery.user_id === SELLER_ID ? 0.7 : discount.discount_percent) *
      delivery.quantity;

    this.revenueRepository.update(adminRevenue.id as any, {
      total_revenue: Number(adminRevenue.total_revenue) + Number(totalRevenue),
      total_sales: Number(adminRevenue.total_sales) + Number(delivery.quantity),
      profit: Number(adminRevenue.profit) + Number(profit),
    });

    return adminRevenue;
  }

  async getSellerRevenue(user: User) {
    const account = await this.paymentsService.findAccountByUserId(user.id);

    if (!account) {
      throw new BadRequestException('Account not found');
    }

    const revenue = await this.revenueRepository
      .findOneBy({
        where: {
          account_id: account.id as any,
        },
      })
      .then((revenue) => RevenueDto.fromEntity(revenue));

    return {
      total_revenue: revenue.total_revenue,
      total_sales: revenue.total_sales,
    };
  }

  async getSellerChart(queries: GetRevenueChartDto, user: User) {
    const data = await this.deliveryService.getShipmentsByDate(
      queries,
      user.id,
    );

    return data;
  }

  async getAdminRevenue(user: User) {
    const account = await this.paymentsService.findAccountByUserId(user.id);

    if (!account) {
      throw new BadRequestException('Account not found');
    }

    const revenue = await this.revenueRepository
      .findOneBy({
        where: {
          account_id: account.id as any,
        },
      })
      .then((revenue) => RevenueDto.fromEntity(revenue));

    const deliveries = await this.deliveryService.getSuccessDeliveries();

    return {
      total_revenue: revenue.total_revenue,
      total_sales: revenue.total_sales,
      profit: revenue.profit,
      delivery_num: deliveries.length,
    };
  }

  async getAdminChart(queries: GetRevenueChartDto, user: User) {
    const data = await this.deliveryService.getShipmentsByDate(queries, null);

    return data;
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

  @OnEvent(DeliveryStatusEnum.DELIVERING)
  async onDelivering({
    shipment_id,
    seller_id,
    product_id,
    quantity,
  }: OnDeliveringEvent) {
    console.log('Delivering event');
  }

  @OnEvent(DeliveryStatusEnum.DELIVERED)
  async onDelivered({ delivery_id, seller_id }: OnDeliveredEvent) {
    console.log('Delivered event');

    // Update revenue
    const delivery = await this.deliveryService.findOneById(delivery_id);

    if (delivery) {
      this.updateRevenue(seller_id, delivery);
    } else {
      console.error('Delivery not found, cannot update revenue');
    }
  }

  @OnEvent(DeliveryStatusEnum.RETURNED)
  async onReturned({
    shipment_id,
    seller_id,
    product_id,
    quantity,
  }: OnReturnedEvent) {
    console.log('Returned event');
  }

  @OnEvent('create.revenue')
  async onCreateRevenue({ account_id }) {
    console.log('emit event: create.revenue');

    await this.revenueRepository.save(RevenueDto.toEntity({ account_id }));
  }

  @OnEvent('update.admin.revenue')
  async updateAdminRevenue({ amount }) {
    console.log('emit event: update.admin.revenue');

    const admin_id = '7bf27eea-ede2-418f-ad32-8c75115b075d';
    const admin_account_id = 'cfb77620-51eb-4c75-a857-5f9c4208cc03';
    const admin_revenue_id = '1';

    const adminRevenue = await this.revenueRepository.findOneBy({
      where: {
        account_id: admin_account_id as any,
      },
    });

    if (!adminRevenue) {
      throw new InternalServerErrorException('Admin revenue not found');
    }

    this.revenueRepository.update(adminRevenue.id as any, {
      total_revenue: Number(adminRevenue.total_revenue) + Number(amount),
      profit: Number(adminRevenue.profit) + Number(amount),
    });

    return adminRevenue;
  }
}
