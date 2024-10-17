import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { RevenuesService } from './revenues.service';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';

@Controller('revenue')
@ApiTags('revenue')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class RevenuesController {
  constructor(private readonly revenuesService: RevenuesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new revenue',
    description: 'Create a new revenue',
  })
  @Roles(RoleEnum.ADMIN)
  async createRevenue(@Body() dto: CreateRevenueDto) {
    return await this.revenuesService.createRevenue(dto);
  }

  @Get('write-to-file')
  @ApiOperation({
    summary: 'Write to file',
    description: 'Write to file',
  })
  @Roles(RoleEnum.ADMIN)
  async writeToFile() {
    return await this.revenuesService.writeToFile();
  }
}
