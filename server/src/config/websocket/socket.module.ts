import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { ConversationsModule } from 'src/modules/conversations/conversations.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [ConversationsModule, UsersModule],
  providers: [ChatGateway],
})
export class SocketModule {}
