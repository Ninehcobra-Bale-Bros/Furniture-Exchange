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

  async findByUserIdAndOtherId(
    user_id: string,
    other_id: string,
  ): Promise<Conversation[]> {
    console.log('user_id', user_id);
    console.log('other_id', other_id);

    const conversation1 = await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoin('conversation.messages', 'message')
      .leftJoin('conversation.product', 'product')
      .leftJoin('conversation.user', 'user')
      .leftJoin('conversation.other', 'other') // Join other user without selecting all fields
      .select([
        'conversation.id',
        'conversation.name',
        'message.id',
        'message.sender_id',
        'message.content',
        'message.isRead',
        'message.created_at',
        'product.id',
        'product.name',
        'product.image_urls',
        'product.price',
        'user.id',
        'user.last_name',
        'user.first_name',
        'user.image_url',
        'other.id',
        'other.last_name',
        'other.first_name',
        'other.image_url',
      ])
      .where(
        '(conversation.user_id = :user_id AND conversation.other_id = :other_id)',
        { user_id, other_id },
      )
      .getMany();

    const conversation2 = await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoin('conversation.messages', 'message')
      .leftJoin('conversation.product', 'product')
      .leftJoin('conversation.user', 'user')
      .leftJoin('conversation.other', 'other') // Join other user without selecting all fields
      .select([
        'conversation.id',
        'conversation.name',
        'message.id',
        'message.sender_id',
        'message.content',
        'message.isRead',
        'message.created_at',
        'product.id',
        'product.name',
        'product.image_urls',
        'product.price',
        'user.id',
        'user.last_name',
        'user.first_name',
        'user.image_url',
        'other.id',
        'other.last_name',
        'other.first_name',
        'other.image_url',
      ])
      .where(
        '(conversation.user_id = :other_id AND conversation.other_id = :user_id)',
        { user_id, other_id },
      )
      .getMany();

    if (conversation1.length || conversation2.length) {
      return [...(conversation1 || []), ...(conversation2 || [])];
    }

    return [];
  }

  async findByProductIdAndSellerIdAndOtherId(
    product_id: number,
    user_id: string,
    other_id: string,
  ): Promise<Conversation> {
    const conversation = await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoin('conversation.messages', 'message')
      .leftJoin('conversation.product', 'product')
      .leftJoin('conversation.user', 'user')
      .leftJoin('conversation.other', 'other') // Join other user without selecting all fields
      .select([
        'conversation.id',
        'conversation.name',
        'message.id',
        'message.sender_id',
        'message.content',
        'message.isRead',
        'message.created_at',
        'product.id',
        'product.name',
        'product.image_urls',
        'product.price',
        'user.id',
        'user.last_name',
        'user.first_name',
        'user.image_url',
        'other.id',
        'other.last_name',
        'other.first_name',
        'other.image_url',
      ])
      .where('conversation.product_id = :product_id', { product_id }) // Dynamically pass the correct product_id
      .andWhere(
        '(conversation.user_id = :user_id AND conversation.other_id = :other_id)',
        { user_id, other_id },
      )
      .getOne();

    if (conversation) {
      return conversation;
    }

    const otherConversation = await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoin('conversation.messages', 'message')
      .where('conversation.product_id = :product_id', { product_id }) // Dynamically pass the correct product_id
      .andWhere(
        '(conversation.user_id = :other_id AND conversation.other_id = :user_id)',
        { user_id, other_id },
      )
      .getOne();

    return otherConversation;
  }

  async findAllConversationsByUserId(user_id: string): Promise<Conversation[]> {
    return await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoin('conversation.product', 'product') // Join product without selecting all fields
      .leftJoin('conversation.user', 'user') // Join user without selecting all fields
      .leftJoin('conversation.other', 'other') // Join other user without selecting all fields
      .leftJoin('conversation.messages', 'message') // Join messages without selecting all fields
      .select([
        'conversation.id', // Select conversation id
        'conversation.name', // Select conversation name
        'product.id', // Select product id
        'product.name', // Select product name
        'product.image_urls',
        'product.price',
        'user.id', // Select user id
        'user.last_name', // Select user name
        'user.first_name',
        'user.image_url',
        'other.id', // Select other user id
        'other.last_name', // Select other user name
        'other.first_name', // Select other user name
        'other.image_url',
        'message.id', // Select message id
        'message.sender_id', // Select message creation date
        'message.content', // Select message content
        'message.isRead', // Select message read status
        'message.created_at', // Select message creation date
      ])
      .where(
        'conversation.user_id = :user_id OR conversation.other_id = :user_id',
        { user_id },
      )
      .getMany();
  }
}
