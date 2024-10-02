import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { ConversationRepository } from './repository/conversation.repository';
import { MessageRepository } from './repository/message.repository';
import { ConversationDto } from './dto/conversation.dto';
import { MessageDto } from './dto/message.dto';

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

  async createMessage(dto: CreateMessageDto) {
    return await this.messageRepository
      .save(MessageDto.toEntity(dto))
      .then((message) => {
        return MessageDto.fromEntity(message);
      });
  }

  findAll() {
    return `This action returns all conversations`;
  }
}
