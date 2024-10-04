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

  async findByProductIdAndSellerIdAndOtherId(
    product_id: number,
    seller_id: string,
    other_id: string,
  ): Promise<Conversation> {
    return await this.conversationRepository
      .createQueryBuilder('conversation')
      .where('conversation.product_id = :product_id', { product_id })
      .andWhere(
        'conversation.seller_id = :seller_id AND conversation.other_id = :other_id OR conversation.seller_id = :other_id AND conversation.other_id = :seller_id',
        { seller_id, other_id },
      )
      .getOne();
  }
}
