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
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Request } from 'express';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { AssignDeliveryDto } from './dto/assign-delivery.dto';
import { FindAllDeliveryQuery } from './dto/find-all-delivery.query';

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
  async getShipments(@Query() query: FindAllDeliveryQuery) {
    console.log(query);

    return await this.deliveryService.getShipments(query);
  }

  @Get('user')
  @ApiOperation({
    summary: '[BUYER] Get all shipments of the user',
  })
  @Roles(RoleEnum.BUYER, RoleEnum.SELLER)
  async getUserShipments(@Req() req: Request) {
    return await this.deliveryService.getUserShipments(req.user);
  }

  @Patch('user/confirm/:id')
  @ApiOperation({
    summary: '[BUYER] Confirm shipment',
  })
  @Roles(RoleEnum.BUYER, RoleEnum.SELLER)
  async confirmShipment(@Param('id') id: string, @Req() req: Request) {
    return await this.deliveryService.confirmShipment(req.user, id);
  }

  @Patch('shipper')
  @ApiOperation({
    summary: '[DELIVER] Update shipment who is delivering',
  })
  @Roles(RoleEnum.DELIVER)
  async updateShipment(@Body() dto: AssignDeliveryDto, @Req() req: Request) {
    return await this.deliveryService.updateShipper(req.user, dto);
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
}
