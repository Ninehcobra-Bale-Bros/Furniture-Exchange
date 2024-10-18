import { PartialType } from '@nestjs/mapped-types';
import { RevenueDto } from './revenue.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRevenueDto extends PartialType(RevenueDto) {}
