import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { DeliveryRepository } from 'src/modules/delivery/repository/delivery.repository';
import { DeliveryDto } from 'src/modules/delivery/dto/delivery.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { ProductsService } from 'src/modules/products/products.service';
import { plainToClass } from 'class-transformer';
import { ProductDto } from 'src/modules/products/dto/product.dto';
import OnDeliveredEvent from './events/delivery-delivered.event';
import {
  DeliveryStatusEnum,
  UpdateStatusEnum,
} from 'src/common/enums/delivery.enum';
import { FindAllDeliveryQuery } from './dto/find-all-delivery.query';
import { PaginationHelper } from 'src/helper/pagination';
import { UpdateStatusDto } from './dto/update-status.dto';
import { RoleEnum, RoleViewEnum } from 'src/common/enums/role.enum';
import { GetRevenueChartDto } from '../revenues/dtos/get-revenue-chart.dto';
import * as fs from 'fs';
import * as path from 'path';
import { EventEmitter2 } from 'eventemitter2';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class DeliveryService {
  constructor(
    private readonly deliveryRepository: DeliveryRepository,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

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

    const url = `/api/v1/delivery`;

    const paginationResult = PaginationHelper.generatePagination(
      queries,
      url,
      transformData,
      totalRecords,
    );

    return paginationResult;
  }

  async getShipperShipments(user: User) {
    const shipments = await this.deliveryRepository
      .findAll({
        where: { deliver_id: user.id },
        relations: ['product'],
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

  async getShipmentsByDate(queries: GetRevenueChartDto, sellerId: string) {
    if (queries.year && queries.month_from && queries.month_to) {
      console.log('condition 1');

      const shipments = await this.deliveryRepository.getShipmentsByDate(
        queries.month_from,
        queries.month_to,
        queries.year,
        sellerId,
      );

      // Generate all months in the selected range
      const allMonths = [];
      for (
        let month = parseInt(queries.month_from);
        month <= parseInt(queries.month_to);
        month++
      ) {
        const formattedMonth = `${queries.year}-${month.toString().padStart(2, '0')}`;
        allMonths.push({
          month: formattedMonth,
          totalRevenue: 0,
          totalQuantity: 0,
        });
      }

      // Merge actual data with all months to fill missing months with 0 revenue and 0 quantity
      const result = allMonths.map((monthObj) => {
        const found = shipments.find(
          (shipment) => shipment.month === monthObj.month,
        );
        return found
          ? {
              ...monthObj,
              totalRevenue: Number(found.totalRevenue),
              totalQuantity: Number(found.totalQuantity),
            }
          : monthObj;
      });

      return result;
    } else if (queries.year && !queries.month_from && !queries.month_to) {
      console.log('condition 2');

      const shipments = await this.deliveryRepository.getShipmentsByYear(
        queries.year,
        sellerId,
      );

      // Generate a list of all months for the year
      const allMonths = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1; // Month index (1 for January, 12 for December)
        return {
          month: `${2024}-${month.toString().padStart(2, '0')}`, // Format month as YYYY-MM
          totalRevenue: 0, // Default to 0
        };
      });

      // Merge the actual results with all months, filling in missing months with 0
      const result = allMonths.map((monthObj) => {
        const found = shipments.find(
          (shipment) => shipment.month === monthObj.month,
        );
        return found
          ? { ...monthObj, totalRevenue: Number(found.totalRevenue) }
          : monthObj;
      });

      return result;
    }
  }

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

    const SELLER_ID = 'd8334efe-45cc-455a-92c1-1f34a65cc942' as any;

    const discountPercent =
      dto.user_id === SELLER_ID ? 0.7 : discount.discount_percent;

    const discountAmount = discountPercent * product.price;
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
      discount_percent: discountPercent,
      discount_amount: discountAmount,
      total_discount: totalDiscount,
      shipping_fee: shippingFee,
      total: product.price * dto.quantity,
      total_after_delivery: totalAfterDelivery,
      total_after_discount: 0,
    };

    const delivery = await this.deliveryRepository
      .save(DeliveryDto.toEntity(dto))
      .then((e) => DeliveryDto.fromEntity(e));

    delete delivery.discount_amount;
    delete delivery.discount_percent;
    delete delivery.total_discount;
    delete delivery.total_after_discount;

    return delivery;
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
    const delivery = await this.deliveryRepository.findOneBy({
      where: { id: deliveryId as any },
    });

    if (!delivery) {
      throw new BadRequestException('Không tìm thấy đơn hàng');
    }

    if (delivery.deliver_id !== user.id && delivery.deliver_id !== null) {
      throw new BadRequestException('Đơn hàng đã được nhận bởi shipper khác');
    }

    if (delivery.deliver_id === user.id) {
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

    if (delivery.other_confirmed) {
      throw new BadRequestException('Đơn hàng đã được bạn xác nhận');
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

  async writeToFile() {
    console.log('Write to file');

    const deliveries = await this.deliveryRepository
      .findAll()
      .then((deliveries) =>
        deliveries.map((delivery) => DeliveryDto.fromEntity(delivery)),
      );

    const filePath = path.resolve('db/seeds/deliveries/deliveries.json');

    fs.writeFile(filePath, JSON.stringify(deliveries), (err) => {
      if (err) {
        throw new InternalServerErrorException(
          `Error writing to file: ${err.message}`,
        );
      }
    });

    return 'Write to file successfully';
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
