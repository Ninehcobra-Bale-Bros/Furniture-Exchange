import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { TransactionDto } from './dto/transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AccountRepository } from './repository/account.repository';
import { TransactionRepository } from './repository/transaction.repository';
import { AccountDto } from './dto/account.dto';
import { UsersService } from '../users/users.service';
import { UUID } from 'crypto';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { VnpayService } from 'src/config/vnpay/vnpay.service';
import { OnEvent } from '@nestjs/event-emitter';
import PaySuccessEvent from 'src/config/events/pay-success.interface';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly vnPayService: VnpayService,
  ) {}

  async findAccountByUserId(userId: string) {
    return this.accountRepository.findOneBy({
      where: {
        user_id: userId as UUID & { __brand: 'userId' },
      },
    });
  }

  async createAccount(dto: CreateAccountDto) {
    const user = this.findAccountByUserId(dto.user_id);

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

  async decreaseBalance(account_id: string, amount: number) {
    const account = await this.accountRepository.findOneBy({
      where: { id: account_id as any },
    });

    if (!account) {
      throw new BadRequestException('Account not found');
    }

    account.balance -= amount;

    try {
      await this.accountRepository.save(account);
    } catch (e) {
      throw new BadRequestException('Không thể thực hiện giao dịch');
    }

    return true;
  }

  //
  async deposit(user: UserDto, ip: string, dto: CreateTransactionDto) {
    const account = await this.accountRepository.findOneBy({
      where: { id: dto.account_id },
    });

    if (!account) {
      throw new BadRequestException('Không tìm thấy tài khoản');
    }

    const paymentUrl = this.vnPayService.createPaymentUrl(
      ip,
      dto.amount.toString(),
      account.id,
    );

    return paymentUrl;
  }

  @OnEvent('payment.success')
  async successDeposit({ amount, account_id }: PaySuccessEvent) {
    const account = await this.accountRepository.findOneBy({
      where: { id: account_id as any },
    });

    if (!account) {
      throw new BadRequestException('Không tìm thấy tài khoản');
    }

    account.balance += amount;

    await this.accountRepository.save(account);

    return 'Nạp tiền thành công';
  }
}
