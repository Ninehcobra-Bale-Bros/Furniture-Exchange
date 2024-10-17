import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './repository/transaction.repository';
import { AccountRepository } from './repository/account.repository';
import { VnpayModule } from 'src/config/vnpay/vnpay.module';
import { Revenue } from './entities/revenue.entity';
import { RevenuesController } from './revenues.controller';
import { RevenuesService } from './revenues.service';
import { RevenueRepository } from './repository/revenue.repository';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Transaction, Revenue]),
    VnpayModule,
    ProductsModule,
  ],
  controllers: [PaymentsController, RevenuesController],
  providers: [
    PaymentsService,
    RevenuesService,
    TransactionRepository,
    AccountRepository,
    RevenueRepository,
  ],
  exports: [PaymentsService, RevenuesService],
})
export class PaymentsModule {}
