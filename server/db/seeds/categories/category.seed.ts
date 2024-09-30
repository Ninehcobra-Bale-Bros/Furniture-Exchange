import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import categories from './categories.json';
import { Category } from 'src/modules/categories/entities/category.entity';

export default class CategorySeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const categoryRepository = dataSource.getRepository(Category);

    const now = new Date();

    Logger.warn('Seeding category...');

    for (const category of categories) {
      await categoryRepository.insert(category as unknown as Category);
    }

    // Reset the sequence after seeding
    await dataSource.query(
      `SELECT setval('category_id_seq', (SELECT MAX(id) FROM category));`,
    );

    const end = new Date();
    const duration = (end.getTime() - now.getTime()) / 1000;

    Logger.fatal(`Seeding completed - Duration: ${duration} seconds`);
  }
}
