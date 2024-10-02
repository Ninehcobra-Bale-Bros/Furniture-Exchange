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
import * as utils from '../../../utils';
import { ConversationsService } from 'src/modules/conversations/conversations.service';
import { UsersService } from 'src/modules/users/users.service';

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
  handleMessage(client: Socket, message: Message) {
    console.log('Message:', message);

    console.log(message.content);

    client.broadcast.emit('reply', 'this is a reply');

    this.server.emit('reply', '...broadcasting');
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }
}

interface Message {
  name: string;
  content: string;
}
