import { PartialType } from '@nestjs/mapped-types';
import { MessageDto } from './message.dto';
import { UUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMessageDto extends PartialType(MessageDto) {
  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Conversation id',
    example: 1,
  })
  @IsString()
  @Transform(({ value }) => Number(value))
  conversation_id!: number & { __brand: 'conversationId' };

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Sender id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  sender_id!: UUID & { __brand: 'userId' };

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Product name',
    example: 'Bàn cũ này giá bao nhiêu?',
  })
  @IsString()
  content!: string;
}
