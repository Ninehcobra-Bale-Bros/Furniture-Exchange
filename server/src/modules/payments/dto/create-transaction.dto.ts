import { PartialType } from '@nestjs/mapped-types';
import { TransactionDto } from './transaction.dto';
import { UUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsUUID } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export class CreateTransactionDto extends PartialType(TransactionDto) {
  // @ApiProperty({
  //   type: String,
  //   description: 'Account id',
  //   example: '1a645d3f-ca0c-4929-8d40-148dee0e877a',
  // })
  // @IsUUID()
  // account_id: UUID & { __brand: 'accountId' };

  @ApiProperty({
    type: 'string',
    description: 'Amount',
    example: '1000000',
  })
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber()
  amount: number;
}
