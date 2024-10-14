import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Patch,
  Param,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Request } from 'express';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';

@Controller('delivery')
@ApiTags('delivery')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get('user/shipments')
  @ApiOperation({
    summary: '[BUYER] Get all shipments of the user',
  })
  @Roles(RoleEnum.BUYER, RoleEnum.SELLER)
  async getShipments(@Req() req: Request) {
    return await this.deliveryService.getShipments(req.user);
  }

  @Patch('user/confirm/:id')
  @ApiOperation({
    summary: '[BUYER] Confirm shipment',
  })
  @Roles(RoleEnum.BUYER, RoleEnum.SELLER)
  async confirmShipment(@Param('id') id: string, @Req() req: Request) {
    return await this.deliveryService.confirmShipment(req.user, id);
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
