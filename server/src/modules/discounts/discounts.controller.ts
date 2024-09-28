import { Controller, Get, Post, Body } from '@nestjs/common';
import { DiscountService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('discounts')
@ApiTags('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @Get()
  findAll() {
    return this.discountService.findAll();
  }

  @Get('write-to-file')
  writeToFile() {
    return this.discountService.writeToFile();
  }
}
