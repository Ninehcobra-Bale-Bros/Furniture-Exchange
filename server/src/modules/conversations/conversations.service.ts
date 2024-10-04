import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { ConversationRepository } from './repository/conversation.repository';
import { MessageRepository } from './repository/message.repository';
import { ConversationDto } from './dto/conversation.dto';
import { MessageDto } from './dto/message.dto';
import { User } from '../users/entities/user.entity';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly conversationRepository: ConversationRepository,
    private readonly messageRepository: MessageRepository,
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
    seller_id: string,
    other_id: string,
  ): Promise<ConversationDto | null> {
    return await this.conversationRepository
      .findOneBy({
        where: {
          product_id: product_id as any,
          seller_id: seller_id as any,
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
    seller_id: string,
    other_id: string,
  ) {
    console.log('product_id', product_id);
    console.log('seller_id', seller_id);
    console.log('other_id', other_id);

    return await this.conversationRepository
      .findByProductIdAndSellerIdAndOtherId(product_id, seller_id, other_id)
      .then((conversation) => {
        console.log('conversation', conversation);

        if (!conversation) {
          return null;
        }

        return ConversationDto.fromEntity(conversation);
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

  findAll() {
    return `This action returns all conversations`;
  }
}
