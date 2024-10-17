import { GenericRepository } from 'src/core/generic.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Delivery } from 'src/modules/delivery/entities/delivery.entity';
import { FindAllDeliveryQuery } from '../dto/find-all-delivery.query';

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
}
