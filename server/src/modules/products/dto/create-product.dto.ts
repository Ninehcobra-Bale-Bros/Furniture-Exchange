import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { StateEnum } from 'src/common/enums/product.enum';
import { ProductDto } from 'src/modules/products/dto/product.dto';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // ES 2015
import timezone from 'dayjs/plugin/timezone'; // ES 2015
dayjs.extend(utc);
dayjs.extend(timezone);

export class CreateProductDto extends PartialType(ProductDto) {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Product name',
    example: 'Bàn cũ',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Product description',
    example: 'Bàn cũ nhưng còn mới',
  })
  @IsString()
  description!: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
    },
    required: false,
    description: 'Product image urls',
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',');
    }
    return value;
  })
  image_urls?: string[];

  @ApiProperty({
    type: 'array',
    items: {
      format: 'binary',
      type: 'string',
    },
    required: false,
    description: 'Product image files',
  })
  image_files?: Express.Multer.File[];

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Product price',
    example: '500000',
  })
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  price!: number;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Product quantity',
    example: '1',
  })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  quantity!: number;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Product origin',
    example: 'Vietnam',
  })
  @IsString()
  origin!: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Product address line',
    example: '123/4',
  })
  @IsString()
  address_line!: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Product district',
    example: 'Quận 1',
  })
  @IsString()
  district!: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Product province',
    example: 'Hồ Chí Minh',
  })
  @IsString()
  province!: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Product state',
    example: StateEnum.USED,
    enum: StateEnum,
  })
  @IsEnum(StateEnum)
  state!: StateEnum;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Product expired at',
    example: dayjs('2024/10/22 10:35:52 AM ', 'YYYY/MM/DD hh:mm:ss A')
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD HH:mm:ss.SSS Z'),
  })
  @Transform(({ value }) => {
    const parts = value.split(' ');
    const last = parts[parts.length - 1];

    return value.replace(last, last.replace(':', ''));
  })
  expired_at: Date;

  @ApiProperty({
    required: true,
    type: 'string',
    example: '1',
  })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  category_id?: number & { __brand: 'categoryId' };
}
