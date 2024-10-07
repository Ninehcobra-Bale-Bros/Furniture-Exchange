import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from './dto/create-account.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('payments')
@ApiTags('payments')
@ApiBearerAuth()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('accounts')
  @ApiOperation({ summary: 'Create a new payment' })
  createAccount(@Body() dto: CreateAccountDto) {
    return this.paymentsService.createAccount(dto);
  }

  @Post('transactions')
  @ApiOperation({ summary: 'Create a new transaction' })
  createTransaction(@Body() dto: CreateTransactionDto) {
    return this.paymentsService.createTransaction(dto);
  }
}
