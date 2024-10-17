import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RevenuesService } from './revenues.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { CreateRevenueDto } from './dtos/create-revenue.dto';
import { Request } from 'express';

@Controller('revenues')
@ApiTags('revenues')
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

  @Get('seller')
  @ApiOperation({
    summary: '[SELLER] get revenues',
    description: 'Get revenues',
  })
  @Roles(RoleEnum.SELLER)
  async getSellerRevenue(@Req() req: Request) {
    return await this.revenuesService.getSellerRevenue(req.user);
  }

  @Get('admin')
  @ApiOperation({
    summary: '[ADMIN] get revenues',
    description: 'Get all revenues',
  })
  @Roles(RoleEnum.ADMIN)
  async getAdminRevenue(@Req() req: Request) {
    return await this.revenuesService.getAdminRevenue(req.user);
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
