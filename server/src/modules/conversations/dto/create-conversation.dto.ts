import { PartialType } from '@nestjs/mapped-types';
import { ConversationDto } from './conversation.dto';
import { UUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateConversationDto extends PartialType(ConversationDto) {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Product id',
    example: '1',
  })
  @Transform(({ value }) => Number(value))
  product_id!: number & { __brand: 'productId' };

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Current user id',
    example: 'd8334efe-45cc-455a-92c1-1f34a65cc942',
  })
  user_id!: UUID & { __brand: 'userId' };

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'other id',
    example: '20949d0d-736c-4802-a3e5-3d3db401c1ad',
  })
  other_id!: UUID & { __brand: 'userId' };
}
