import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { DeliveryRepository } from 'src/modules/delivery/repository/delivery.repository';
import { DeliveryDto } from 'src/modules/delivery/dto/delivery.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { ProductsService } from 'src/modules/products/products.service';

@Injectable()
export class DeliveryService {
  constructor(
    private readonly deliveryRepository: DeliveryRepository,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  async create(seller: User, dto: CreateDeliveryDto) {
    dto = {
      ...dto,
      user_id: seller.id,
    };

    const buyer = await this.usersService.findOneById(seller.id);

    if (!buyer) {
      throw new BadRequestException('Không tìm thấy người mua');
    }

    if (buyer.id === seller.id) {
      throw new BadRequestException('Người mua không thể là người bán');
    }

    const product = await this.productsService.isProductBelongToSeller(
      dto.product_id,
      seller.id,
    );

    if (!product) {
      throw new BadRequestException(
        'Sản phẩm không thuộc sở hữu của người bán',
      );
    }

    if (!(dto.quantity <= product.quantity)) {
      throw new BadRequestException('Số lượng sản phẩm không đủ');
    }

    let shippingFee = 0;

    if (product.kilogram <= 5) {
      shippingFee = 30 * 1000;
    } else if (product.kilogram <= 10) {
      shippingFee = 60 * 1000;
    } else if (product.kilogram <= 20) {
      shippingFee = 90 * 1000;
    } else {
      shippingFee = 120 * 1000;
    }

    shippingFee *= dto.quantity;

    dto = {
      ...dto,
      amount: product.price,
      shipping_fee: shippingFee,
      total: Number(product.price * dto.quantity) + shippingFee,
    };

    const delivery = await this.deliveryRepository
      .save(DeliveryDto.toEntity(dto))
      .then((e) => DeliveryDto.fromEntity(e));

    return delivery;
  }
}
