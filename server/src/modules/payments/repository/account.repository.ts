import { GenericRepository } from 'src/core/generic.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';

export class AccountRepository extends GenericRepository<Account> {
  constructor(@InjectRepository(Account) private readonly accountRepository) {
    super(accountRepository);
  }
}
