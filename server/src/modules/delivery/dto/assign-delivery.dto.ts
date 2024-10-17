import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class AssignDeliveryDto {
  @ApiProperty({
    required: true,
    type: 'array',
    description: 'Delivery ids',
    example: ['27', '28'],
  }) // Add this line
  @Transform(({ value }) => {
    console.log(value);

    if (Array.isArray(value)) {
      return value.map((v) => Number(v));
    }

    return value;
  }) // Add this line
  @IsNumber({}, { each: true }) // Add this line
  deliver_ids: string[];
}
