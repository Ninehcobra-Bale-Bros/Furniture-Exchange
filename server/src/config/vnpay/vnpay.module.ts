import { Module } from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { VnpayController } from './vnpay.controller';

@Module({
  imports: [],
  controllers: [VnpayController],
  providers: [VnpayService],
})
export class VnpayModule {}
