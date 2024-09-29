import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { StateEnum, StatusEnum } from 'src/common/enums/product.enum';
import { ProductDto } from 'src/modules/products/dto/product.dto';

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
  image_urls?: string[];

  @ApiProperty({
    type: 'array',
    items: {
      format: 'binary',
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
    example: 'd8334efe-45cc-455a-92c1-1f34a65cc942',
  })
  @IsUUID()
  seller_id!: UUID & { __brand: 'userId' };

  @ApiProperty({
    required: true,
    type: 'string',
    example: '1',
  })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  category_id?: number & { __brand: 'categoryId' };
}
