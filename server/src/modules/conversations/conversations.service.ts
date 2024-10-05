import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { ConversationRepository } from './repository/conversation.repository';
import { MessageRepository } from './repository/message.repository';
import { ConversationDto } from './dto/conversation.dto';
import { MessageDto } from './dto/message.dto';
import { User } from '../users/entities/user.entity';
import { ProductsService } from 'src/modules/products/products.service';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly conversationRepository: ConversationRepository,
    private readonly messageRepository: MessageRepository,
    private readonly productService: ProductsService,
  ) {}

  async create(dto: CreateConversationDto) {
    return await this.conversationRepository
      .save(ConversationDto.toEntity(dto))
      .then((conversation) => {
        return ConversationDto.fromEntity(conversation);
      });
  }

  async findOne(
    product_id: number,
    user_id: string,
    other_id: string,
  ): Promise<ConversationDto | null> {
    return await this.conversationRepository
      .findOneBy({
        where: {
          product_id: product_id as any,
          user_id: user_id as any,
          other_id: other_id as any,
        },
      })
      .then((conversation) => {
        if (!conversation) {
          return null;
        }

        return ConversationDto.fromEntity(conversation);
      });
  }

  async findByUserIdAndOtherId(user_id: string, other_id: string) {
    return await this.conversationRepository
      .findByUserIdAndOtherId(user_id, other_id)
      .then((conversation) => {
        if (!conversation) {
          return null;
        }

        const final = conversation.reduce((pre, val) => {
          return [...pre, ...val.messages];
        }, []);

        return final.sort((a, b) => {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        });
      });
  }

  async findByProductIdAndSellerIdAndOtherId(
    product_id: number,
    user_id: string,
    other_id: string,
  ) {
    console.log('product_id', product_id);
    console.log('user_id', user_id);
    console.log('other_id', other_id);

    return await this.conversationRepository
      .findByProductIdAndSellerIdAndOtherId(product_id, user_id, other_id)
      .then((conversation) => {
        if (!conversation) {
          return null;
        }

        return conversation;
      });
  }

  async createMessage(dto: CreateMessageDto, user: User) {
    return await this.messageRepository
      .save(
        MessageDto.toEntity({
          ...dto,
          sender_id: user.id,
        }),
      )
      .then((message) => {
        return MessageDto.fromEntity(message);
      });
  }

  async GetAllConversations(user: User) {
    const conversations = await this.conversationRepository
      .findAllConversationsByUserId(user.id)
      .then((conversations) => {
        const grouped = {};

        conversations.forEach((conversation) => {
          const userId = conversation.user.id;
          const otherId = conversation.other.id;

          let key1 = '';
          let key2 = '';

          if (user.id === userId) {
            key1 = userId;
            key2 = otherId;
          } else {
            key1 = otherId;
            key2 = userId;
          }

          const key = `${key1}-${key2}`;

          if (!grouped[key]) {
            grouped[key] = {
              user: conversation.user,
              other: conversation.other,
              messages: [],
            };

            grouped[key].messages = conversation.messages;
          } else {
            grouped[key].messages = [
              ...grouped[key].messages,
              ...conversation.messages,
            ];

            grouped[key].messages = grouped[key].messages.sort((a, b) => {
              return (
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
              );
            });
          }
        });

        return Object.values(grouped);
      });

    return conversations;
  }

  async GetConversationByProductId(product_id: string, user: User) {
    if (!parseInt(product_id)) {
      throw new BadRequestException('Invalid product id');
    }

    const product = await this.productService.findById(product_id);

    if (user.id === product.seller_id) {
      throw new BadRequestException('Invalid conversation');
    }

    const conversation = await this.findByProductIdAndSellerIdAndOtherId(
      Number(product_id),
      user.id,
      product.seller_id,
    );

    // console.log(conversation);

    return conversation;
  }

  async GetConversationByOtherId(user: User, other_id: string) {
    // if (!parseInt(other_id)) {
    //   throw new BadRequestException('Invalid other id');
    // }

    const conversation = await this.findByUserIdAndOtherId(user.id, other_id);

    return conversation;
  }

  async writeToFile() {
    return [];
  }
}
