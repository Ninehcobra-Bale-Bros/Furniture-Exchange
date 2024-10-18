import { ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { IsOptional, Matches, Max, Min } from 'class-validator';
import { QueryFilterBase } from 'src/core/base.query';
import { DateRegex } from 'src/core/regex/date.regex';

export class GetRevenueChartDto extends QueryFilterBase {
  @ApiPropertyOptional({ required: false, example: '2024' })
  @IsOptional()
  year: string;

  // @Matches(DateRegex)
  @ApiPropertyOptional({ required: false, example: '01' })
  @IsOptional()
  month_from: string;

  // @Matches(DateRegex)
  @IsOptional()
  @ApiPropertyOptional({ required: false, example: '12' })
  month_to: string;
}
