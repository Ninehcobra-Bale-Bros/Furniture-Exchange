import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Patch,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Request } from 'express';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { FindAllDeliveryQuery } from './dto/find-all-delivery.query';
import { UpdateStatusDto } from './dto/update-status.dto';
import { FindAllDeliverySellerQuery } from './dto/find-all-delivery-seller';

@Controller('delivery')
@ApiTags('delivery')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get()
  @ApiOperation({
    summary: '[ADMIN, DELIVER] Get all shipments',
  })
  @Roles(RoleEnum.DELIVER, RoleEnum.ADMIN)
  async getShipments(
    @Query() query: FindAllDeliveryQuery,
    @Req() req: Request,
  ) {
    return await this.deliveryService.getShipments(query, req.user);
  }

  @Get('user')
  @ApiOperation({
    summary: '[BUYER] Get all shipments of the user',
  })
  @Roles(RoleEnum.BUYER, RoleEnum.SELLER)
  async getUserShipments(@Req() req: Request) {
    return await this.deliveryService.getUserShipments(req.user);
  }

  @Get('shipper')
  @ApiOperation({
    summary: '[DELIVER] Get all shipments of the user',
  })
  @Roles(RoleEnum.DELIVER)
  async getShipperShipments(@Req() req: Request) {
    return await this.deliveryService.getShipperShipments(req.user);
  }

  @Get('seller')
  @ApiOperation({
    summary: '[SELLER] Get all shipments of the seller',
  })
  @Roles(RoleEnum.SELLER)
  async getSellerShipments(
    @Query() query: FindAllDeliverySellerQuery,
    @Req() req: Request,
  ) {
    return await this.deliveryService.getSellerShipments(query, req.user);
  }

  @Patch('user/confirm/:id')
  @ApiOperation({
    summary: '[BUYER] Confirm shipment',
  })
  @Roles(RoleEnum.BUYER, RoleEnum.SELLER)
  async confirmShipment(@Param('id') id: string, @Req() req: Request) {
    return await this.deliveryService.confirmShipment(req.user, id);
  }

  @Patch('status/:id')
  @ApiOperation({
    summary: '[DELIVER, ADMIN] Update shipment status',
  })
  @Roles(RoleEnum.DELIVER, RoleEnum.ADMIN)
  async updateStatus(
    @Param('id') id: string,
    @Query() dto: UpdateStatusDto,
    @Req() req: Request,
  ) {
    return await this.deliveryService.updateDeliveryStatus(req.user, id, dto);
  }

  @Patch('deliver/:id')
  @ApiOperation({
    summary: '[DELIVER] Update shipment who is delivering',
  })
  @Roles(RoleEnum.DELIVER)
  async updateShipment(@Param('id') deliveryId: string, @Req() req: Request) {
    if (!Number(deliveryId)) {
      throw new BadRequestException('Delivery id must be a number');
    }

    return await this.deliveryService.updateShipper(req.user, deliveryId);
  }

  @Patch('user/cancel/:id')
  @ApiOperation({
    summary: '[BUYER] cancel shipment',
  })
  @Roles(RoleEnum.BUYER, RoleEnum.SELLER)
  async cancelShipment(@Param('id') id: string, @Req() req: Request) {
    return await this.deliveryService.cancelShipment(req.user, id);
  }

  @Post()
  @Roles(RoleEnum.SELLER)
  @ApiOperation({
    summary: '[SELLER] create shipment',
  })
  create(@Body() createDeliveryDto: CreateDeliveryDto, @Req() req: Request) {
    return this.deliveryService.create(req.user, createDeliveryDto);
  }

  @Get('write-to-file')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({
    summary: 'Write to file',
  })
  async writeToFile() {
    return await this.deliveryService.writeToFile();
  }
}
