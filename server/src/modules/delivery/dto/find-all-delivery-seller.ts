import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { DeliveryStatusEnum } from 'src/common/enums/delivery.enum';
import { RoleViewEnum } from 'src/common/enums/role.enum';
import { QueryFilterBase } from 'src/core/base.query';

export class FindAllDeliverySellerQuery extends QueryFilterBase {
  @ApiProperty({
    required: false,
    example: '1',
  })
  offset: number;

  @ApiProperty({
    required: false,
    example: '5',
  })
  limit: number;

  @IsOptional()
  @IsEnum(DeliveryStatusEnum)
  @ApiPropertyOptional({
    required: false,
    enum: DeliveryStatusEnum,
    example: DeliveryStatusEnum.PENDING,
  })
  status: DeliveryStatusEnum;
}
