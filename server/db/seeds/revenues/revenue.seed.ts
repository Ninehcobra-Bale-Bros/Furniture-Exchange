import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import revenues from './revenues.json';
import { Revenue } from 'src/modules/payments/entities/revenue.entity';

export default class RevenueSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userRepository = dataSource.getRepository(Revenue);

    const now = new Date();

    Logger.warn('Seeding Revenue...');

    for (const revenue of revenues) {
      await userRepository.insert(revenue as unknown as Revenue);
    }

    const end = new Date();
    const duration = (end.getTime() - now.getTime()) / 1000;

    Logger.fatal(`Seeding completed - Duration: ${duration} seconds`);
  }
}
