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
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    TypeOrmModule.forFeature([Conversation, Message]),
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService, ConversationRepository, MessageRepository],
  exports: [ConversationsService],
})
export class ConversationsModule {}
