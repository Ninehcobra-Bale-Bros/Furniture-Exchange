import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Gateway } from '../gateway';
import { Server, Socket } from 'socket.io';
import { ConversationsService } from 'src/modules/conversations/conversations.service';
import { UsersService } from 'src/modules/users/users.service';
import { ConversationDto } from 'src/modules/conversations/dto/conversation.dto';

interface Message {
  product_id: number;
  other_id: string;
  content: string;
}

@WebSocketGateway(3002, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  extends Gateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly conversationsService: ConversationsService,
    readonly usersService: UsersService,
  ) {
    super(usersService);
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const user = await this.authenticate(client);

    if (!user) {
      return;
    }

    console.log('Client connected:', client.id);
  }

  @SubscribeMessage('newMessage')
  async handleMessage(client: Socket, message: Message) {
    const user = await this.authenticate(client);

    if (!user) {
      return;
    }

    let conversation: ConversationDto | null = null;

    conversation =
      await this.conversationsService.findByProductIdAndSellerIdAndOtherId(
        message.product_id,
        user.id,
        message.other_id,
      );

    if (!conversation) {
      conversation = await this.conversationsService.create({
        product_id: message.product_id as any,
        user_id: user.id as any,
        other_id: message.other_id as any,
      });
    }

    this.conversationsService.createMessage(
      {
        content: message.content,
        conversation_id: conversation.id,
      },
      user as any,
    );

    client.broadcast.emit(conversation.name, {
      ...message,
      conversation_name: conversation.name,
    });
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }
}
