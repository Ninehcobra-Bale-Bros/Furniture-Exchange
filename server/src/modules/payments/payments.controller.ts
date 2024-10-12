import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from './dto/create-account.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/role.decorator';

@Controller('payments')
@ApiTags('payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('accounts')
  @ApiOperation({
    summary: '[ADMIN] DO NOT USE THIS ENDPOINT',
  })
  @Roles(RoleEnum.ADMIN)
  createAccount(@Body() dto: CreateAccountDto) {
    return this.paymentsService.createAccount(dto);
  }

  @Post('transactions')
  @ApiOperation({
    summary: '[ADMIN] DO NOT USE THIS ENDPOINT',
  })
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Create a new transaction' })
  createTransaction(@Body() dto: CreateTransactionDto) {
    return this.paymentsService.createTransaction(dto);
  }

  @Post('transactions/deposit')
  @ApiOperation({
    summary: '[BUYER, SELLER, ADMIN] deposit money',
  })
  @Roles(RoleEnum.BUYER, RoleEnum.SELLER, RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Deposit money' })
  deposit(@Body() dto: CreateTransactionDto, @Req() req: Request) {
    return this.paymentsService.deposit(req.user, req.ip, dto);
  }
}
