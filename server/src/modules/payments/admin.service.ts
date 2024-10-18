import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PaymentsService } from './payments.service';
import { RoleEnum } from 'src/common/enums/role.enum';
import { ProductsService } from '../products/products.service';
import randomAccess from 'src/utils/random-access';

@Injectable()
export class AdminService {
  constructor(
    private readonly accountsService: PaymentsService,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  async dashboard() {
    const users = await this.usersService.findAll();
    const products = await this.productsService.findAll();

    const product_quantity = products.reduce(
      (acc, product) => acc + product.quantity,
      0,
    );

    const sellers_num = users.filter(
      (seller) => seller.role === RoleEnum.SELLER,
    ).length;

    return {
      users_num: users.length,
      sellers_num: sellers_num,
      products_num: products.length,
      accesses_num: randomAccess(3000, 3500),
    };
  }
}
