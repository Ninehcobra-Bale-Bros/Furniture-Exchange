import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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

  @Post()
  @Roles(RoleEnum.SELLER)
  create(@Body() createDeliveryDto: CreateDeliveryDto, @Req() req: Request) {
    return this.deliveryService.create(req.user, createDeliveryDto);
  }
}
