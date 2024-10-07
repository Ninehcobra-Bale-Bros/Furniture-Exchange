import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { TransactionDto } from './dto/transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class PaymentsService {
  createAccount(dto: CreateAccountDto) {
    return 'This action adds a new payment';
  }

  createTransaction(dto: CreateTransactionDto) {
    return 'This action adds a new payment';
  }
}
