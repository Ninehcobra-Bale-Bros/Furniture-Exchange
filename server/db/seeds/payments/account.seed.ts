import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import accounts from './accounts.json';
import { Account } from 'src/modules/payments/entities/account.entity';

export default class AccountSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const accountRepository = dataSource.getRepository(Account);

    const now = new Date();

    Logger.warn('Seeding account...');

    for (const account of accounts) {
      await accountRepository.insert(account as unknown as Account);
    }

    const end = new Date();
    const duration = (end.getTime() - now.getTime()) / 1000;

    Logger.fatal(`Seeding completed - Duration: ${duration} seconds`);
  }
}
