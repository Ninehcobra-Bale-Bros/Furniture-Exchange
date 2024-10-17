import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { DeliveryStatusEnum } from 'src/common/enums/delivery.enum';
import { RoleViewEnum } from 'src/common/enums/role.enum';
import { QueryFilterBase } from 'src/core/base.query';

export class FindAllDeliveryQuery extends QueryFilterBase {
  @IsOptional()
  @IsEnum(DeliveryStatusEnum)
  @ApiPropertyOptional({
    required: false,
    enum: DeliveryStatusEnum,
    example: DeliveryStatusEnum.PENDING,
  })
  status: DeliveryStatusEnum;

  @IsOptional()
  @IsEnum(RoleViewEnum)
  @ApiPropertyOptional({
    required: false,
    enum: RoleViewEnum,
    example: RoleViewEnum.DELIVER_VIEW,
  })
  view: RoleViewEnum;
}
