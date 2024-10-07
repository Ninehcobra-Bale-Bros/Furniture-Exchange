import { PartialType } from '@nestjs/mapped-types';
import { AccountDto } from './account.dto';
import { UUID } from 'crypto';
import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto extends PartialType(AccountDto) {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'User id',
    example: 'd8334efe-45cc-455a-92c1-1f34a65cc942',
  })
  @IsUUID()
  user_id: UUID & { __brand: 'userId' };
}
