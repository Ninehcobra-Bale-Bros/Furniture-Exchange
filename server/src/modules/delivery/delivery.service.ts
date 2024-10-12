import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

@Injectable()
export class DeliveryService {
  create(createDeliveryDto: CreateDeliveryDto) {
    return 'This action adds a new delivery';
  }
}
