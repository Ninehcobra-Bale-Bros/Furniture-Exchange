import { Module } from '@nestjs/common';
import { ChatGateway } from 'src/config/websocket/chat';
import { ConversationsModule } from 'src/modules/conversations/conversations.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [ConversationsModule, UsersModule],
  providers: [ChatGateway],
})
export class SocketModule {}
