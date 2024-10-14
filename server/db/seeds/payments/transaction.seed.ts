import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import transactions from './transactions.json';
import { Transaction } from 'src/modules/payments/entities/transaction.entity';

export default class TransactionSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const transactionRepository = dataSource.getRepository(Transaction);

    const now = new Date();

    Logger.warn('Seeding transaction...');

    for (const transaction of transactions) {
      await transactionRepository.insert(transaction as unknown as Transaction);
    }

    if (transactions.length > 0) {
      await dataSource.query(
        `SELECT setval('transaction_id_seq', (SELECT MAX(id) FROM transaction));`,
      );
    }

    const end = new Date();
    const duration = (end.getTime() - now.getTime()) / 1000;

    Logger.fatal(`Seeding completed - Duration: ${duration} seconds`);
  }
}
