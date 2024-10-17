import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { DeliveryRepository } from 'src/modules/delivery/repository/delivery.repository';
import { DeliveryDto } from 'src/modules/delivery/dto/delivery.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { ProductsService } from 'src/modules/products/products.service';
import { plainToClass } from 'class-transformer';
import { ProductDto } from 'src/modules/products/dto/product.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import OnDeliveredEvent from './events/delivery-delivered.event';
import OnReturnedEvent from './events/delivery-returned.event';
import OnDeliveringEvent from './events/delivery-delivering.event';
import {
  DeliveryStatusEnum,
  UpdateStatusEnum,
} from 'src/common/enums/delivery.enum';
import { FindAllDeliveryQuery } from './dto/find-all-delivery.query';
import { PaginationHelper } from 'src/helper/pagination';
import { UpdateStatusDto } from './dto/update-status.dto';
import { RoleEnum, RoleViewEnum } from 'src/common/enums/role.enum';
import { RevenuesService } from '../revenues/revenues.service';

@Injectable()
export class DeliveryService {
  constructor(
    private readonly deliveryRepository: DeliveryRepository,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findOneById(deliveryId: number) {
    const delivery = await this.deliveryRepository
      .findOneBy({
        where: { id: deliveryId as any },
      })
      .then((delivery) => DeliveryDto.fromEntity(delivery));

    return delivery;
  }

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

    const discount = await this.productsService.findAppropriateDiscount(
      product.price,
    );

    const discountAmount = discount.discount_percent * product.price;
    const totalDiscount = discountAmount * dto.quantity;

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

    const totalAfterDelivery =
      Number(product.price * dto.quantity) + shippingFee;
    const totalAfterDiscount =
      Number(product.price * dto.quantity) + totalDiscount;

    dto = {
      ...dto,
      amount: product.price,
      discount_percent: discount.discount_percent,
      discount_amount: discountAmount,
      total_discount: totalDiscount,
      shipping_fee: shippingFee,
      total_after_delivery: totalAfterDelivery,
      total_after_discount: totalAfterDiscount,
    };

    const delivery = await this.deliveryRepository
      .save(DeliveryDto.toEntity(dto))
      .then((e) => DeliveryDto.fromEntity(e));

    delete delivery.discount_amount;
    delete delivery.discount_percent;
    delete delivery.total_discount;

    return delivery;
  }

  async getShipments(queries: FindAllDeliveryQuery, user: User) {
    if (
      queries.view === RoleViewEnum.ADMIN_VIEW &&
      user.role !== RoleEnum.ADMIN
    ) {
      throw new UnauthorizedException('Bạn không có quyền xem danh sách này');
    }

    const shipments =
      await this.deliveryRepository.paginateWithQueries(queries);

    const [data, totalRecords] = shipments;

    const transformData = data.map((delivery) => {
      delivery.product = plainToClass(ProductDto, delivery.product) as any;

      if (queries.view === RoleViewEnum.DELIVER_VIEW) {
        delete delivery.discount_amount;
        delete delivery.discount_percent;
        delete delivery.total_discount;
        delete delivery.total_after_discount;
      } else {
        delete delivery.total_after_delivery;
        delete delivery.shipping_fee;
      }

      return plainToClass(DeliveryDto, delivery);
    });

    const url = `http://localhost:3001/api/v1/delivery`;

    const paginationResult = PaginationHelper.generatePagination(
      queries,
      url,
      transformData,
      totalRecords,
    );

    return paginationResult;
  }

  async getUserShipments(user: User) {
    const shipments = await this.deliveryRepository
      .findAll({
        where: { other_id: user.id, status: DeliveryStatusEnum.PENDING },
        relations: ['product'],
        select: [
          'id',
          'user_id',
          'other_id',
          'deliver_id',
          'product_id',
          'product',
          'other_fullname',
          'other_phone',
          'pickup_address',
          'delivery_address',
          'amount',
          'quantity',
          'shipping_fee',
          'total_after_delivery',
          'total_after_discount',
          'status',
          'other_confirmed',
          'created_at',
          'updated_at',
          'expired_at',
        ],
      })
      .then((deliveries) =>
        deliveries.map((delivery) => {
          // You can manipulate the product or return it as is
          const shipment = DeliveryDto.fromEntity(delivery) as any;
          shipment.product = plainToClass(ProductDto, delivery.product); // Assign product

          delete shipment.discount_amount;
          delete shipment.discount_percent;
          delete shipment.total_discount;
          delete shipment.total_after_discount;

          return shipment;
        }),
      );

    return shipments;
  }

  async updateShipper(user: User, deliveryId: string) {
    const delivery = await this.deliveryRepository
      .findOneBy({
        where: { id: deliveryId as any },
      })
      .then((delivery) => DeliveryDto.fromEntity(delivery));

    if (!delivery) {
      throw new BadRequestException('Không tìm thấy đơn hàng');
    }

    if (delivery.deliver_id !== user.id && delivery.deliver_id !== null) {
      throw new BadRequestException('Đơn hàng đã được nhận bởi shipper khác');
    }

    if (delivery.deliver_id === user.id && delivery.status == 'delivering') {
      const cancelDelivery = await this.deliveryRepository.update(
        {
          id: delivery.id,
        },
        {
          deliver_id: null,
        },
      );

      return {
        code: cancelDelivery.affected ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
        message: cancelDelivery.affected
          ? 'Hủy nhận đơn hàng thành công'
          : 'Huỷ đơn hàng không thành công',
      };
    }

    const approveDelivery = await this.deliveryRepository.update(
      {
        id: delivery.id,
      },
      {
        deliver_id: user.id,
      },
    );

    return {
      code: approveDelivery.affected ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      message: approveDelivery.affected
        ? 'Nhận đơn hàng thành công'
        : 'Nhận đơn hàng không thành công',
    };
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
      throw new BadRequestException('Đơn hàng đã có trạng thái khác');
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
        'Cập nhật trạng thái đang giao hàng thất bại',
      );
    }

    // Update product quantity
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
          'Không thể hủy đơn hàng, cập nhật trạng thái đơn hàng thất bại',
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

  async updateDeliveryStatus(
    user: User,
    deliveryId: string,
    dto: UpdateStatusDto,
  ) {
    const delivery = await this.deliveryRepository.findOneBy({
      where: { id: deliveryId as any },
    });

    if (!delivery) {
      throw new BadRequestException('Không tìm thấy đơn vận chuyển');
    }

    if (delivery.deliver_id !== user.id) {
      throw new BadRequestException(
        'Không phải đơn của bạn, không có quyền thực hiện hành động này',
      );
    }

    if (delivery.status === DeliveryStatusEnum.RETURNED) {
      throw new BadRequestException('Đơn hàng đã được trả lại');
    }

    if (delivery.status === DeliveryStatusEnum.DELIVERED) {
      throw new BadRequestException('Đơn hàng đã được giao');
    }

    let result = null;

    switch (dto.status) {
      case UpdateStatusEnum.DELIVERING:
        if (delivery.status === DeliveryStatusEnum.PENDING) {
          result = await this.deliveryRepository.update(
            {
              id: delivery.id,
            },
            {
              status: DeliveryStatusEnum.DELIVERING,
            },
          );
        } else {
          throw new BadRequestException(
            'Đơn hàng đang ở trạng thái không phải "PENDING"',
          );
        }
        break;
      case UpdateStatusEnum.DELIVERED:
        if (delivery.status === DeliveryStatusEnum.DELIVERING) {
          result = await this.deliveryRepository.update(
            {
              id: delivery.id,
            },
            {
              status: DeliveryStatusEnum.DELIVERED,
            },
          );

          this.eventEmitter.emit(DeliveryStatusEnum.DELIVERED, {
            delivery_id: delivery.id,
            seller_id: delivery.user_id,
            buyer_id: delivery.other_id,
            product_id: delivery.product_id,
          } as OnDeliveredEvent);
        } else {
          throw new BadRequestException(
            'Đơn hàng đang ở trạng thái không phải "DELIVERING"',
          );
        }
        break;
      case UpdateStatusEnum.RETURNED:
        if (delivery.status === DeliveryStatusEnum.DELIVERING) {
          result = await this.deliveryRepository.update(
            {
              id: delivery.id,
            },
            {
              status: DeliveryStatusEnum.RETURNED,
            },
          );
          this.eventEmitter.emit(DeliveryStatusEnum.RETURNED, {} as any);
        } else {
          throw new BadRequestException(
            'Đơn hàng đang ở trạng thái không phải "DELIVERING"',
          );
        }
        break;
    }

    return {
      code: HttpStatus.OK,
      message: 'Cập nhật trạng thái đơn hàng thành công',
    };
  }

  // admin
  async getSuccessDeliveries() {
    const deliveries = await this.deliveryRepository
      .getDashboardData()
      .then((deliveries) => {
        return deliveries.map((deli) => DeliveryDto.fromEntity(deli));
      });

    return deliveries;
  }
}
