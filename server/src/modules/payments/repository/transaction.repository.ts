import { GenericRepository } from 'src/core/generic.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction.entity';

export class TransactionRepository extends GenericRepository<Transaction> {
  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository,
  ) {
    super(transactionRepository);
  }
}
