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
  ): Promise<[Delivery[], number]> {
    let QueryBuilder = this.deliveryRepository.createQueryBuilder('delivery');

    if (query.status) {
      QueryBuilder = QueryBuilder.andWhere('delivery.status = :status', {
        status: query.status,
      });
    }

    const [data, totalRecords] = await this.buildQuery(QueryBuilder, query);

    return [data, totalRecords];
  }
}
