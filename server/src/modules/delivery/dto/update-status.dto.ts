import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UpdateStatusEnum } from 'src/common/enums/delivery.enum';

export class UpdateStatusDto {
  @IsEnum(UpdateStatusEnum)
  @ApiProperty({
    required: true,
    enum: UpdateStatusEnum,
    example: UpdateStatusEnum.DELIVERING,
  })
  status: UpdateStatusEnum;
}
