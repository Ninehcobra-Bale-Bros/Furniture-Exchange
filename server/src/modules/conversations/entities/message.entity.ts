import { BaseEntity } from 'src/core/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversation } from './conversation.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { UUID } from 'crypto';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id!: number & { __brand: 'messageId' };

  @Column({ type: 'int', nullable: false })
  conversation_id!: number & { __brand: 'conversationId' };

  @ManyToOne(() => Conversation, (conversation) => conversation.id)
  @JoinColumn({
    name: 'conversation_id',
    referencedColumnName: 'id',
  })
  conversation!: Conversation;

  @Column({ type: 'uuid', nullable: false })
  sender_id!: UUID & { __brand: 'userId' };

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'sender_id',
    referencedColumnName: 'id',
  })
  sender!: User;

  @Column({ type: 'text', nullable: false })
  content!: string;
}
