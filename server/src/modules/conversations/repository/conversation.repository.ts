import { GenericRepository } from 'src/core/generic.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from '../entities/conversation.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversationRepository extends GenericRepository<Conversation> {
  constructor(
    @InjectRepository(Conversation) private readonly conversationRepository,
  ) {
    super(conversationRepository);
  }
}
