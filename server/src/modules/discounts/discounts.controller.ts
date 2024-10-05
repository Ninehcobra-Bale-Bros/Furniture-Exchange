import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { DiscountService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('discounts')
@ApiTags('discounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  @ApiOperation({
    summary: '[ADMIN] Create a discount',
  })
  @Roles(RoleEnum.ADMIN)
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @Get()
  @ApiOperation({
    summary: '[ADMIN] Get all discounts',
  })
  @Roles(RoleEnum.ADMIN)
  findAll() {
    return this.discountService.findAll();
  }

  @Get('write-to-file')
  @ApiOperation({
    summary: '[ADMIN] DO NOT USE THIS ENDPOINT',
  })
  @Roles(RoleEnum.ADMIN)
  writeToFile() {
    return this.discountService.writeToFile();
  }
}
