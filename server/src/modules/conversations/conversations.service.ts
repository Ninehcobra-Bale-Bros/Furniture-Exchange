import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { ConversationRepository } from './repository/conversation.repository';
import { MessageRepository } from './repository/message.repository';
import { ConversationDto } from './dto/conversation.dto';
import { MessageDto } from './dto/message.dto';
import { User } from '../users/entities/user.entity';
import { ProductsService } from 'src/modules/products/products.service';
import * as fs from 'fs';
import * as path from 'path';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { Product } from 'src/modules/products/entities/product.entity';
import { UsersService } from '../users/users.service';
import { UUID } from 'crypto';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly conversationRepository: ConversationRepository,
    private readonly messageRepository: MessageRepository,
    private readonly productService: ProductsService,
    private readonly usersService: UsersService,
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

  async getLastMessageOfAllConversation(user: User) {
    let myConversation = await this.conversationRepository.findOneWithCondition(
      {
        where: {
          user_id: user.id,
          other_id: null,
          product_id: null,
        },
      },
    );

    if (!myConversation) {
      myConversation = await this.conversationRepository.save(
        ConversationDto.toEntity({
          user_id: user.id,
        }),
      );
    }

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
              user: plainToClass(UserDto, conversation.user),
              other: plainToClass(UserDto, conversation.other),
              messages: [],
              last_message: null,
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

          let messages = grouped[key].messages;

          grouped[key].last_message = messages[messages.length - 1];
        });

        return Object.values(grouped)
          .sort((a, b) => {
            return (
              new Date(b['last_message'].created_at).getTime() -
              new Date(a['last_message'].created_at).getTime()
            );
          })
          .map((conversation) => {
            return {
              user: conversation['user'],
              other: conversation['other'],
              last_message: conversation['last_message'],
            };
          });
      });

    return {
      conversation_name: myConversation.name,
      conversations: conversations,
    };
  }

  async GetConversationByProductId(product_id: string, user: User) {
    if (!parseInt(product_id)) {
      throw new BadRequestException('Invalid product id');
    }

    const product = await this.productService.findById(product_id);

    if (!product) {
      throw new BadRequestException('Invalid product id');
    }

    if (user.id === product.seller_id) {
      throw new BadRequestException('Can not get conversation with yourself');
    }

    let conversation = await this.findByProductIdAndSellerIdAndOtherId(
      Number(product_id),
      user.id,
      product.seller_id,
    );

    if (!conversation) {
      const newConversation = await this.create({
        product_id: Number(product_id) as any,
        user_id: user.id,
        other_id: product.seller_id,
      });

      conversation = await this.findByProductIdAndSellerIdAndOtherId(
        Number(product_id),
        user.id,
        product.seller_id,
      );
    }

    conversation.user = plainToClass(User, conversation.user);
    conversation.other = plainToClass(User, conversation.other);
    conversation.product = plainToClass(Product, conversation.product);

    return conversation;
  }

  async GetConversationByOtherId(user: User, other_id: string) {
    try {
      const conversation = await this.findByUserIdAndOtherId(user.id, other_id);

      return conversation;
    } catch (error) {
      throw new BadRequestException('Invalid user_id or conversation');
    }
  }

  async getConversationWithOther(user: User, other_id: any) {
    const other = await this.usersService.findOneById(other_id);

    if (!other) {
      throw new BadRequestException('Invalid other_id');
    }

    const conversation = await this.findByUserIdAndOtherId(user.id, other_id);

    if (!conversation) {
      const newConversation = await this.create({
        user_id: user.id,
        other_id: other_id,
        product_id: null,
      });

      return newConversation;
    }

    return conversation;
  }

  async findConversationByUserIdWithUpsert(
    user_id: UUID & { __brand: 'userId' },
  ) {
    const conversation = await this.conversationRepository.findOneBy({
      where: {
        user_id: user_id,
        other_id: null,
        product_id: null,
      },
    });

    if (!conversation) {
      const newConversation = await this.create({
        user_id: user_id,
        other_id: null,
        product_id: null,
      });

      return newConversation;
    }

    return conversation;
  }

  async findConversationByUserIdAndOtherIdWithUpsert(
    user_id: UUID & { __brand: 'userId' },
    other_id: UUID & { __brand: 'userId' },
  ) {
    const conversation = await this.conversationRepository.findOneBy({
      where: {
        user_id: user_id,
        other_id: other_id,
      },
    });

    if (!conversation) {
      const newConversation = await this.create({
        user_id: user_id,
        other_id: other_id,
        product_id: null,
      });

      return newConversation;
    }

    return conversation;
  }

  private async findByUserIdAndOtherId(user_id: string, other_id: string) {
    return await this.conversationRepository
      .findByUserIdAndOtherId(user_id, other_id)
      .then((conversation) => {
        if (!conversation) {
          return null;
        }

        for (const item of conversation) {
          for (const message of item.messages) {
            if (message.sender_id !== user_id) {
              message.isRead = true;
            }

            this.messageRepository.update(
              {
                conversation_id: item.id,
                isRead: false,
              },
              {
                isRead: true,
              },
            );
          }
        }

        const final = conversation.reduce((pre, val) => {
          return [...pre, ...val.messages];
        }, []);

        const sortMessages = final.sort((a, b) => {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        });

        return {
          user: plainToClass(UserDto, conversation[0].user),
          other: plainToClass(UserDto, conversation[0].other),
          messages: sortMessages,
        };
      });
  }

  async writeToFile() {
    console.log('write to file');

    const conversations = await this.conversationRepository.findAll();
    const messages = await this.messageRepository.findAll();

    console.log('conversations', conversations);
    console.log('messages', messages);

    const filePath_1 = path.resolve(
      'db/seeds/conversations/conversations.json',
    );
    const filePath_2 = path.resolve('db/seeds/conversations/messages.json');

    fs.writeFile(filePath_1, JSON.stringify(conversations), (err) => {
      if (err) {
        throw new InternalServerErrorException(
          `Error writing to file: ${err.message}`,
        );
      }
    });

    fs.writeFile(filePath_2, JSON.stringify(messages), (err) => {
      if (err) {
        throw new InternalServerErrorException(
          `Error writing to file: ${err.message}`,
        );
      }
    });

    return 'Write to file successfully';
  }
}
