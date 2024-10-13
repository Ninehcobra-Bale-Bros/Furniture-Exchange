import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { DeliveryRepository } from 'src/modules/delivery/repository/delivery.repository';
import { DeliveryDto } from 'src/modules/delivery/dto/delivery.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { ProductsService } from 'src/modules/products/products.service';
import { DeliveryStatusEnum } from 'src/common/enums/delivery.enum';

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

    const buyer = await this.usersService.findOneById(dto.other_id);

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

  async getShipments(user: User) {
    const shipments = await this.deliveryRepository
      .findAll({
        where: { other_id: user.id },
      })
      .then((deliveries) => deliveries.map((d) => DeliveryDto.fromEntity(d)));

    return shipments;
  }

  async confirmShipment(user: User, deliveryId: string) {
    const delivery = await this.deliveryRepository.findOneBy({
      where: { id: deliveryId as any },
    });

    if (!delivery) {
      throw new BadRequestException('Không tìm thấy đơn hàng');
    }

    if (delivery.other_id !== user.id) {
      throw new BadRequestException(
        'Bạn không có quyền thực hiện hành động này',
      );
    }

    if (delivery.status !== 'pending') {
      throw new BadRequestException('Đơn hàng đã được xác nhận');
    }

    const updatedDelivery = await this.deliveryRepository.update(
      {
        id: delivery.id,
      },
      {
        other_confirmed: true,
      },
    );

    if (!updatedDelivery.affected) {
      throw new BadRequestException(
        'Không thể xác nhận đơn hàng, cập nhật thất bại',
      );
    }

    this.productsService.updateQuantity(
      delivery.product_id,
      -delivery.quantity,
    );

    return {
      message: updatedDelivery.affected
        ? 'Xác nhận đơn hàng thành công'
        : 'Xác nhận đơn hàng thất bại',
      is_confirmed: updatedDelivery.affected ? true : false,
    };
  }

  async cancelShipment(user: User, deliveryId: string) {
    const delivery = await this.deliveryRepository.findOneBy({
      where: { id: deliveryId as any },
    });

    if (!delivery) {
      throw new BadRequestException('Không tìm thấy đơn vận chuyển');
    }

    if (delivery.other_id !== user.id) {
      throw new BadRequestException(
        'Bạn không có quyền thực hiện hành động này',
      );
    }

    if (delivery.other_confirmed) {
      const updatedProduct = await this.productsService.updateQuantity(
        delivery.product_id,
        delivery.quantity,
      );

      if (!updatedProduct) {
        throw new BadRequestException(
          'Không thể hủy đơn hàng, cập nhật thất bại',
        );
      }

      const deleted = await this.deliveryRepository.delete({
        id: delivery.id,
      });

      return {
        message: deleted.affected
          ? 'Hủy đơn hàng thành công'
          : 'Hủy đơn hàng thất bại',
        is_deleted: deleted.affected ? true : false,
      };
    } else {
      const deleted = await this.deliveryRepository.delete({
        id: delivery.id,
      });

      return {
        message: deleted.affected
          ? 'Hủy đơn hàng thành công'
          : 'Hủy đơn hàng thất bại',
        is_deleted: deleted.affected ? true : false,
      };
    }
  }
}
