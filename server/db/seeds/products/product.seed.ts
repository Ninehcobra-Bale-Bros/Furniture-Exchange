import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import products from './products.json';
import { Product } from 'src/modules/products/entities/product.entity';

export default class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const productRepository = dataSource.getRepository(Product);

    const now = new Date();

    Logger.warn('Seeding products...');

    for (const user of products) {
      await productRepository.insert(user as unknown as Product);
    }

    await dataSource.query(
      `SELECT setval('discount_id_seq', (SELECT MAX(id) FROM discount));`,
    );

    const end = new Date();
    const duration = (end.getTime() - now.getTime()) / 1000;

    Logger.fatal(`Seeding completed - Duration: ${duration} seconds`);
  }
}
