import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import revenues from './revenues.json';
import { Revenue } from 'src/modules/revenues/entities/revenue.entity';

export default class RevenueSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const revenueRepository = dataSource.getRepository(Revenue);

    const now = new Date();

    Logger.warn('Seeding Revenue...');

    for (const revenue of revenues) {
      await revenueRepository.insert(revenue as unknown as Revenue);
    }

    const end = new Date();
    const duration = (end.getTime() - now.getTime()) / 1000;

    Logger.fatal(`Seeding completed - Duration: ${duration} seconds`);
  }
}
