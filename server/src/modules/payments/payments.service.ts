import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { TransactionDto } from './dto/transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AccountRepository } from './repository/account.repository';
import { TransactionRepository } from './repository/transaction.repository';
import { AccountDto } from './dto/account.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly userService: UsersService,
  ) {}

  async createAccount(dto: CreateAccountDto) {
    const user = this.userService.findOneById(dto.user_id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const account = this.accountRepository
      .save(AccountDto.toEntity(dto))
      .then((account) => {
        return AccountDto.fromEntity(account);
      });

    return account;
  }

  async createTransaction(dto: CreateTransactionDto) {
    const account = this.accountRepository
      .findOneBy({
        where: { id: dto.account_id },
      })
      .then((account) => {
        return AccountDto.fromEntity(account);
      });

    if (!account) {
      throw new BadRequestException('Account not found');
    }

    const transaction = await this.transactionRepository
      .save(TransactionDto.toEntity(dto))
      .then((transaction) => {
        return TransactionDto.fromEntity(transaction);
      });

    return transaction;
  }

  //
  async deposit() {
    return;
  }
}
