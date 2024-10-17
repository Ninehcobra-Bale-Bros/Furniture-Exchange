import { BadRequestException, Injectable } from '@nestjs/common';
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
import { DeliveryStatusEnum } from 'src/common/enums/delivery.enum';
import { AssignDeliveryDto } from './dto/assign-delivery.dto';
import { FindAllDeliveryQuery } from './dto/find-all-delivery.query';
import { PaginationHelper } from 'src/helper/pagination';

@Injectable()
export class DeliveryService {
  constructor(
    private readonly deliveryRepository: DeliveryRepository,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly eventEmitter: EventEmitter2,
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

  async getShipments(queries: FindAllDeliveryQuery) {
    const shipments =
      await this.deliveryRepository.paginateWithQueries(queries);

    const [data, totalRecords] = shipments;

    const url = `http://localhost:3001/api/v1/delivery`;

    const paginationResult = PaginationHelper.generatePagination(
      queries,
      url,
      data,
      totalRecords,
    );

    return paginationResult;
  }

  async getUserShipments(user: User) {
    const shipments = await this.deliveryRepository
      .findAll({
        where: { other_id: user.id },
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
          'total',
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
          return shipment;
        }),
      );

    return shipments;
  }

  async updateShipper(user: User, dto: AssignDeliveryDto) {
    const ids: string[] = dto.deliver_ids;

    if (!ids.length) {
      throw new BadRequestException('Không có đơn hàng nào được chọn');
    }

    type Delivery = {
      id: number;
      message: string;
    }[];

    const shipments = await this.deliveryRepository
      .findDeliveryByIds(ids)
      .then((deliveries) => {
        return deliveries.map((delivery) => DeliveryDto.fromEntity(delivery));
      });

    let returnMessage: Delivery = [];

    for (const shipment of shipments) {
      if (shipment.status !== DeliveryStatusEnum.PENDING) {
        returnMessage.push({
          id: shipment.id,
          message: 'Đơn hàng đã có trạng thái khác',
        });
        continue;
      }

      if (shipment.deliver_id) {
        returnMessage.push({
          id: shipment.id,
          message: 'Đơn hàng đã được giao cho người vận chuyển khác',
        });
        continue;
      }

      this.deliveryRepository.update(
        {
          id: shipment.id,
        },
        {
          deliver_id: user.id,
          status: DeliveryStatusEnum.DELIVERING,
        },
      );
    }

    return returnMessage;
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
        status: DeliveryStatusEnum.DELIVERING,
      },
    );

    if (!updatedDelivery.affected) {
      throw new BadRequestException(
        'Cập nhật trạng thái đang giao hàng thất bại',
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

  @OnEvent(DeliveryStatusEnum.DELIVERING)
  async onDelivering({
    shipment_id,
    seller_id,
    product_id,
    quantity,
  }: OnDeliveringEvent) {}

  @OnEvent('delivery.delivered')
  async onDelivered({
    shipment_id,
    seller_id,
    buyer_id,
    product_id,
    quantity,
  }: OnDeliveredEvent) {}

  @OnEvent('delivery.returned')
  async onReturned({
    shipment_id,
    seller_id,
    product_id,
    quantity,
  }: OnReturnedEvent) {}
}
