import { GenericRepository } from 'src/core/generic.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../entities/message.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageRepository extends GenericRepository<Message> {
  constructor(@InjectRepository(Message) private readonly messageRepository) {
    super(messageRepository);
  }
}
