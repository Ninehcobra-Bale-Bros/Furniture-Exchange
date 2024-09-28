import { PartialType } from '@nestjs/mapped-types';
import { DiscountDto } from './discount.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString, Max, Min } from 'class-validator';

export class CreateDiscountDto extends PartialType(DiscountDto) {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Category name',
    example: 'Giá >= 50000000 giảm 1%',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Category description',
    example: 'Giảm giá cho các sản phẩm có giá trên 50 triệu',
  })
  @IsString()
  description!: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Minimum price',
    example: '50000000',
  })
  min_price!: number;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Discount percent',
    example: '1',
  })
  @Min(0)
  @Max(100)
  discount_percent!: number;

  @Exclude()
  id: number & { __brand: 'discountId' };
}
