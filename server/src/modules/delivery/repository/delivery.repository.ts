import { GenericRepository } from 'src/core/generic.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Delivery } from 'src/modules/delivery/entities/delivery.entity';
import { FindAllDeliveryQuery } from '../dto/find-all-delivery.query';
import { DeliveryStatusEnum } from 'src/common/enums/delivery.enum';

@Injectable()
export class DeliveryRepository extends GenericRepository<Delivery> {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
  ) {
    super(deliveryRepository);
  }

  async findDeliveryByIds(ids: string[]) {
    return await this.deliveryRepository
      .createQueryBuilder('delivery')
      .where('delivery.id IN (:...ids)', { ids })
      .getMany();
  }

  async paginateWithQueries(
    query: FindAllDeliveryQuery,
    relation: string = '',
  ): Promise<[Delivery[], number]> {
    let QueryBuilder = this.deliveryRepository
      .createQueryBuilder('delivery')
      .leftJoin('delivery.product', 'product')
      .addSelect([
        'product.name', // Select only the 'name' field
        'product.price', // Example: selecting 'price' field
        'product.image_urls', // Example: selecting 'image_urls' field
        'product.id', // Example: selecting 'id' field
        'product.kilogram',
      ]);

    if (query.status) {
      QueryBuilder = QueryBuilder.andWhere(
        'delivery.status = :status AND delivery.other_confirmed = :other_confirmed',
        {
          status: query.status,
          other_confirmed: true,
        },
      );
    }

    const [data, totalRecords] = await this.buildQuery(QueryBuilder, query);

    return [data, totalRecords];
  }

  async getDashboardData() {
    const deliveries = await this.deliveryRepository
      .createQueryBuilder('delivery')
      .where('delivery.status = :status1 OR delivery.status = :status2', {
        status1: DeliveryStatusEnum.DELIVERED,
        status2: DeliveryStatusEnum.DELIVERING,
      })
      .getMany();

    return deliveries;
  }

  private parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number); // Split and convert to numbers
    return new Date(year, month - 1, day); // Create a new Date object
  }

  async getShipmentsByDate(
    month_from: string = '1', // Default to January
    month_to: string = '12', // Default to December
    year: string, // Year (e.g., "2024")
    seller_id: string = null, // Seller ID
  ) {
    console.log('month_from', month_from);
    console.log('month_to', month_to);
    // Pad month_from and month_to with zero if necessary (e.g., "1" becomes "01")
    // const paddedMonthFrom = month_from.padStart(2, '0');
    // const paddedMonthTo = month_to.padStart(2, '0');

    // Create the start date (e.g., "2024-01-01")
    const start_date = new Date(`${year}-${month_from}-01T00:00:00.000Z`);

    // Create the end date for the last day of month_to
    const end_date = new Date(
      new Date(`${year}-${month_to}-01T00:00:00.000Z`).setMonth(
        parseInt(month_to, 10),
      ),
    );

    console.log('start_date', start_date);
    console.log('end_date', end_date);

    // Query to get shipments within the date range and for the specific seller
    const shipments = await this.deliveryRepository
      .createQueryBuilder('delivery')
      .select("TO_CHAR(delivery.created_at, 'YYYY-MM')", 'month') // Group by month
      .addSelect(
        `SUM(${seller_id ? 'delivery.total' : 'delivery.total_after_discount'})`,
        'totalRevenue',
      ) // Sum total_after_discount for revenue
      .addSelect('SUM(delivery.quantity)', 'totalQuantity') // Sum the quantity for total items
      .where(`${seller_id ? 'delivery.user_id = :seller_id' : ''}`, {
        seller_id,
      })
      .andWhere('delivery.created_at BETWEEN :start_date AND :end_date', {
        start_date,
        end_date,
      })
      .andWhere('delivery.status = :status', {
        status: DeliveryStatusEnum.DELIVERED,
      }) // Only consider delivered shipments
      .groupBy("TO_CHAR(delivery.created_at, 'YYYY-MM')") // Group by year-month
      .orderBy('month', 'ASC') // Order by month
      .getRawMany();

    return shipments;
  }

  async getShipmentsByYear(year: string, seller_id: string) {
    const start_date = new Date(`${year}-01-01T00:00:00.000Z`); // Start of the year
    const end_date = new Date(`${year}-12-31T23:59:59.999Z`); // End of the year

    const shipments = await this.deliveryRepository
      .createQueryBuilder('delivery')
      .select("TO_CHAR(delivery.created_at, 'YYYY-MM')", 'month') // Group by month
      .addSelect(
        `SUM(${seller_id ? 'delivery.total' : 'delivery.total_after_discount'})`,
        'totalRevenue',
      ) // Sum total_after_discount for revenue
      .addSelect('SUM(delivery.quantity)', 'totalQuantity') // Sum the quantity for total items
      .where(`${seller_id ? 'delivery.user_id = :seller_id' : ''}`, {
        seller_id,
      })
      .andWhere('delivery.created_at BETWEEN :start_date AND :end_date', {
        start_date,
        end_date,
      })
      .andWhere('delivery.status = :status', {
        status: DeliveryStatusEnum.DELIVERED,
      }) // Only consider delivered shipments
      .groupBy("TO_CHAR(delivery.created_at, 'YYYY-MM')") // Group by year-month
      .orderBy('month', 'ASC') // Order by month
      .getRawMany(); // Return raw result

    return shipments;
  }
}
