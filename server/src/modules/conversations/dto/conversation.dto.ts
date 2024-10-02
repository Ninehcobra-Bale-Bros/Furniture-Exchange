import { UUID } from 'crypto';
import { Conversation } from '../entities/conversation.entity';

export class ConversationDto implements Readonly<ConversationDto> {
  id!: number & { __brand: 'conversationId' };
  name!: string;
  product_id!: number & { __brand: 'productId' };
  seller_id!: UUID & { __brand: 'userId' };
  buyer_id!: UUID & { __brand: 'userId' };
  created_at!: Date;

  public static from(dto: Partial<ConversationDto>) {
    const it = new ConversationDto();

    it.id = dto.id;
    it.name = dto.name;
    it.product_id = dto.product_id;
    it.seller_id = dto.seller_id;
    it.buyer_id = dto.buyer_id;
    it.created_at = dto.created_at;

    return it;
  }

  public static fromEntity(entity: Conversation) {
    return this.from({
      id: entity.id,
      name: entity.name,
      product_id: entity.product_id,
      seller_id: entity.seller_id,
      buyer_id: entity.buyer_id,
      created_at: entity.created_at,
    });
  }

  public static toEntity(dto: Partial<ConversationDto>) {
    const it = new Conversation();

    it.id = dto.id;
    it.name = `conversation_${Date.now()}`;
    it.product_id = dto.product_id;
    it.seller_id = dto.seller_id;
    it.buyer_id = dto.buyer_id;

    return it;
  }
}
