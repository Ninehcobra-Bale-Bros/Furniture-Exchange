import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './repository/transaction.repository';
import { AccountRepository } from './repository/account.repository';
import { VnpayModule } from 'src/config/vnpay/vnpay.module';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Transaction]), VnpayModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, TransactionRepository, AccountRepository],
  exports: [PaymentsService],
})
export class PaymentsModule {}
