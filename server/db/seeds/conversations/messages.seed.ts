import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import messages from './messages.json';
import { Message } from 'src/modules/conversations/entities/message.entity';

export default class MessageSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const messageRepository = dataSource.getRepository(Message);

    const now = new Date();

    Logger.warn('Seeding message...');

    for (const message of messages) {
      await messageRepository.insert(message as unknown as Message);
    }

    await dataSource.query(
      `SELECT setval('message_id_seq', (SELECT MAX(id) FROM message));`,
    );

    const end = new Date();
    const duration = (end.getTime() - now.getTime()) / 1000;

    Logger.fatal(`Seeding completed - Duration: ${duration} seconds`);
  }
}
