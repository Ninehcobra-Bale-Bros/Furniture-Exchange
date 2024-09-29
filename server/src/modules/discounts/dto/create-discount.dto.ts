import { PartialType } from '@nestjs/mapped-types';
import { DiscountDto } from './discount.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { IsNumber, IsString, Max, Min } from 'class-validator';

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
  @Transform(({ value }) => parseFloat(value))
  min_price!: number;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Minimum price',
    example: '50000000',
  })
  @Transform(({ value }) => parseFloat(value))
  max_price?: number;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Discount percent',
    example: '1',
  })
  @Min(0)
  @Max(100)
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  discount_percent!: number;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'order of discount',
    example: '1',
  })
  @Transform(({ value }) => Number(value))
  order!: number;

  @Exclude()
  id: number & { __brand: 'discountId' };
}
