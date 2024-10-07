import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { VnpayService } from './vnpay.service';
import { Request } from 'express';

@Controller('vnpay')
@ApiTags('vnpay')
export class VnpayController {
  constructor(private readonly VnpayService: VnpayService) {}

  @Get('create-payment-url')
  getUrl(@Req() req: Request, @Query('amount') amount: string) {
    return this.VnpayService.createPaymentUrl(req.ip, amount);
  }

  @Get('vnpay_ipn')
  ipn(@Req() req: Request) {
    console.log(req.query);

    return this.VnpayService.ipn(req.query);
  }
}
