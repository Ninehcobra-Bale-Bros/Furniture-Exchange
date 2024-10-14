import { GenericRepository } from 'src/core/generic.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Delivery } from 'src/modules/delivery/entities/delivery.entity';

@Injectable()
export class DeliveryRepository extends GenericRepository<Delivery> {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
  ) {
    super(deliveryRepository);
  }
}
