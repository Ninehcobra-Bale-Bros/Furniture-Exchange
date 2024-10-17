import { ApiProperty } from '@nestjs/swagger';
import {
  ApiPropertyOptional,
  createApiPropertyDecorator,
} from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  Matches,
  Min,
} from 'class-validator';
import { DateRegex } from './regex/date.regex';
import { TypeSortEnum } from 'src/common/enums/type-sort.enum';

export class QueryFilterBase {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @ApiProperty({
    required: false,
    example: '1',
  })
  @Min(1)
  offset: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @createApiPropertyDecorator({
    required: false,
    example: '5',
  })
  @Min(1)
  limit: number = 5;

  //   @Matches(DateRegex)
  //   @ApiPropertyOptional({ required: false, example: '01/01/2024' })
  //   @IsOptional()
  //   startDate: string;

  //   @Matches(DateRegex)
  //   @IsOptional()
  //   @ApiPropertyOptional({ required: false, example: '01/12/2024' })
  //   endDate: string;

  // @IsOptional()
  // @IsEnum(TypeSortEnum)
  // @ApiPropertyOptional({
  //   required: false,
  //   enum: TypeSortEnum,
  //   example: TypeSortEnum.DESC,
  // })
  // sortBy: TypeSortEnum = TypeSortEnum.DESC;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : false))
  @ApiPropertyOptional({ required: false })
  isDeleted: boolean = false;
}
