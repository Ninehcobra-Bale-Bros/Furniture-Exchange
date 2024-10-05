import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { ConversationRepository } from './repository/conversation.repository';
import { MessageRepository } from './repository/message.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Conversation } from './entities/conversation.entity';
import { ProductsService } from 'src/modules/products/products.service';
import { ProductsModule } from 'src/modules/products/products.module';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([Conversation, Message])],
  controllers: [ConversationsController],
  providers: [ConversationsService, ConversationRepository, MessageRepository],
  exports: [ConversationsService],
})
export class ConversationsModule {}
