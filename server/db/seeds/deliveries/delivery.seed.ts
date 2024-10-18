import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import deliveries from './deliveries.json';
import { Delivery } from 'src/modules/delivery/entities/delivery.entity';

export default class DeliverySeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const deliveryRepository = dataSource.getRepository(Delivery);

    const now = new Date();

    Logger.warn('Seeding deliveries...');

    for (const delivery of deliveries) {
      await deliveryRepository.insert(delivery as unknown as Delivery);
    }

    const end = new Date();
    const duration = (end.getTime() - now.getTime()) / 1000;

    Logger.fatal(`Seeding completed - Duration: ${duration} seconds`);
  }
}
