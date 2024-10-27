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
import { UUID } from 'crypto';
import { ProductsService } from 'src/modules/products/products.service';
import { Message, MessageType } from '../interfaces';

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
    private readonly productsService: ProductsService,
  ) {
    super(usersService);
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const user = await this.authenticate(client);

    console.log('Client connected:', client.id);

    if (!user) {
      console.log('Unauthorized, auto disconnecting...');
      return;
    }

    console.log('User authenticated id:', user.id);
  }

  @SubscribeMessage('newMessage')
  async handleMessageWithProduct(client: Socket, message: Message) {
    console.log('1');

    const otherUser = await this.usersService.findOneById(message.other_id);

    const otherConversation =
      await this.conversationsService.findConversationByUserIdWithUpsert(
        otherUser.id,
      );

    client.broadcast.emit(otherConversation.name, {
      type: MessageType.NEW_MESSAGE,
      ...message,
    });
  }

  @SubscribeMessage('newMessage')
  async handleNewMessage(client: Socket, message: Message) {
    console.log('2');

    const user = await this.authenticate(client);

    if (!user) {
      return;
    }

    let conversation: ConversationDto | null = null;

    const otherUser = await this.usersService.findOneById(message.other_id);

    if (!otherUser) {
      return;
    }

    try {
      parseInt(message.product_id);

      const product = await this.productsService.findById(message.product_id);

      if (!product) {
        return;
      }

      conversation =
        await this.conversationsService.findByProductIdAndSellerIdAndOtherId(
          Number(message.product_id),
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
    } catch {
      // without product

      const conversationWithoutProduct =
        await this.conversationsService.findConversationByUserIdAndOtherIdWithUpsert(
          user.id,
          message.other_id,
        );

      this.conversationsService.createMessage(
        {
          content: message.content,
          conversation_id: conversationWithoutProduct.id,
        },
        user as any,
      );
    }
  }

  @SubscribeMessage('shipmentAlert')
  async handleShipmentAlert(client: Socket, message: Message) {
    const user = await this.authenticate(client);

    if (!user) {
      return;
    }

    const otherUser = await this.usersService.findOneById(message.other_id);

    if (!otherUser) {
      return;
    }

    const conversation =
      await this.conversationsService.findConversationByUserIdWithUpsert(
        otherUser.id,
      );

    client.broadcast.emit(conversation.name, {
      type: MessageType.SHIPMENT_ALERT,
      ...message,
    });
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }
}
