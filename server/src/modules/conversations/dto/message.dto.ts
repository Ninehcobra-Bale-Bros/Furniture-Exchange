import { UUID } from 'crypto';
import { Message } from '../entities/message.entity';

export class MessageDto implements Readonly<MessageDto> {
  id!: number & { __brand: 'messageId' };

  conversation_id!: number & { __brand: 'conversationId' };

  sender_id!: UUID & { __brand: 'userId' };

  content!: string;

  created_at!: Date;

  public static from(dto: Partial<MessageDto>) {
    const it = new MessageDto();

    it.id = dto.id;
    it.conversation_id = dto.conversation_id;
    it.sender_id = dto.sender_id;
    it.content = dto.content;
    it.created_at = dto.created_at;

    return it;
  }

  public static fromEntity(entity: Message) {
    return this.from({
      id: entity.id,
      conversation_id: entity.conversation_id,
      sender_id: entity.sender_id,
      content: entity.content,
      created_at: entity.created_at,
    });
  }

  public static toEntity(dto: Partial<MessageDto>) {
    const it = new Message();

    it.id = dto.id;
    it.conversation_id = dto.conversation_id;
    it.sender_id = dto.sender_id;
    it.content = dto.content;
    it.created_at = dto.created_at;

    return it;
  }
}
