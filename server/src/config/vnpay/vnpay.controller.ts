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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { VnpayService } from './vnpay.service';
import { Request } from 'express';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';

@Controller('vnpay')
@ApiTags('vnpay')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class VnpayController {
  constructor(private readonly VnpayService: VnpayService) {}

  // @Get('create/url')
  // @ApiOperation({
  //   summary: '[ADMIN] DO NOT USE THIS ENDPOINT',
  // })
  // @Roles(RoleEnum.ADMIN)
  // getUrl(@Req() req: Request, @Query('amount') amount: string) {
  //   return this.VnpayService.createPaymentUrl(
  //     req.ip,
  //     amount,
  //     '5bb8bc66-a1a8-42bb-b6b5-24a5d426bc47',
  //   );
  // }

  @Get('ipn')
  @ApiOperation({
    summary: '[ADMIN] DO NOT USE THIS ENDPOINT',
  })
  @Roles(RoleEnum.BUYER, RoleEnum.SELLER, RoleEnum.ADMIN)
  ipn(@Req() req: Request) {
    console.log(req.query);

    return this.VnpayService.ipn(req.query);
  }
}
