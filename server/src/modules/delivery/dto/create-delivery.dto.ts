import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsPhoneNumber } from 'class-validator';
import { UUID } from 'crypto';
import { DeliveryStatusEnum } from 'src/common/enums/delivery.enum';
import { DeliveryDto } from 'src/modules/delivery/dto/delivery.dto';

export class CreateDeliveryDto extends PartialType(DeliveryDto) {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'buyer id',
    example: '20949d0d-736c-4802-a3e5-3d3db401c1ad',
  })
  other_id: UUID & { __brand: 'userId' };

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Product id',
    example: '27',
  })
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber()
  product_id: number;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Other fullname',
    example: 'Nguyen Van A',
  })
  other_fullname: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Other phone',
    example: '0123456789',
  })
  @IsPhoneNumber('VN')
  other_phone: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'quantity',
    example: '1',
  })
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Pickup address',
    example: '123 Nguyen Van Linh, Quận 7, Ho Chi Minh City',
  })
  pickup_address: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Delivery address',
    example: '1060 Kha Van Can, Thủ Đức, Ho Chi Minh City',
  })
  delivery_address: string;
}
