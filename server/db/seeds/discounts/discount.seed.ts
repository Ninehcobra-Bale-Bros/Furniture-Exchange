import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import discounts from './discounts.json';
import { Discount } from 'src/modules/discounts/entities/discount.entity';

export default class DiscountSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const discountRepository = dataSource.getRepository(Discount);

    const now = new Date();

    Logger.warn('Seeding category...');

    for (const discount of discounts) {
      await discountRepository.insert(discount as unknown as Discount);
    }

    await dataSource.query(
      `SELECT setval('discount_id_seq', (SELECT MAX(id) FROM discount));`,
    );

    const end = new Date();
    const duration = (end.getTime() - now.getTime()) / 1000;

    Logger.fatal(`Seeding completed - Duration: ${duration} seconds`);
  }
}
