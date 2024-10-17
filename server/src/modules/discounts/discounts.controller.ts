import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { DiscountService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('discounts')
@ApiTags('discounts')
@UseGuards(JwtAuthGuard, RoleGuard)
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: '[ADMIN] Create a discount',
  })
  @Roles(RoleEnum.ADMIN)
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: '[PUBLIC] Get all discounts',
  })
  findAll() {
    return this.discountService.findAll();
  }

  @Get('appropriate-price')
  @Public()
  @ApiOperation({
    summary: '[PUBLIC] Get the appropriate discount with price',
  })
  getAppropriatePrice(@Query('price') price: number) {
    return this.discountService.findCompatibleDiscountByPrice(price);
  }

  // @Get('write-to-file')
  // @ApiOperation({
  //   summary: '[ADMIN] DO NOT USE THIS ENDPOINT',
  // })
  // @Roles(RoleEnum.ADMIN)
  // writeToFile() {
  //   return this.discountService.writeToFile();
  // }
}
