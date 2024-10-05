import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import conversations from './conversations.json';
import { Conversation } from 'src/modules/conversations/entities/conversation.entity';

export default class ConversationSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const conversationRepository = dataSource.getRepository(Conversation);

    const now = new Date();

    Logger.warn('Seeding conversation...');

    for (const conversation of conversations) {
      await conversationRepository.insert(
        conversation as unknown as Conversation,
      );
    }

    await dataSource.query(
      `SELECT setval('conversation_id_seq', (SELECT MAX(id) FROM conversation));`,
    );

    const end = new Date();
    const duration = (end.getTime() - now.getTime()) / 1000;

    Logger.fatal(`Seeding completed - Duration: ${duration} seconds`);
  }
}
