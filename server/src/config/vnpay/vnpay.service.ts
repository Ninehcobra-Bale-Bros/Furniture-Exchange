import { BadRequestException, Injectable } from '@nestjs/common';
import { signedParams, vnpayParamsBuilder } from 'src/utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { VNPAY_RESPONSE_MESSAGE } from 'src/common/constants/vnpay.constant';
import { EventEmitter2 } from '@nestjs/event-emitter';
import PaySuccessEvent from 'src/config/events/pay-success.interface';
dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class VnpayService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  createPaymentUrl(ipAddr: string, amount: string, info: string) {
    if (!parseFloat(amount)) {
      throw new BadRequestException('Amount must be a number');
    }

    const createDate = dayjs().tz('Asia/Ho_Chi_Minh').format('YYYYMMDDHHmmss');

    const expireDate = dayjs()
      .tz('Asia/Ho_Chi_Minh')
      .add(1, 'day')
      .format('YYYYMMDDHHmmss');

    const vnpUrl = vnpayParamsBuilder(
      ipAddr,
      info,
      parseFloat(amount),
      createDate,
    );

    return vnpUrl;
  }

  ipn(query: object) {
    const { secureHash, signed, vnp_Params } = signedParams(query);

    if (secureHash === signed) {
      var orderId = vnp_Params['vnp_TxnRef'];
      var rspCode = vnp_Params['vnp_ResponseCode'];
      var info = vnp_Params['vnp_OrderInfo'];
      var amount = vnp_Params['vnp_Amount'];
      const account_id = info.split(' ')[1];

      let message = '';
      amount = parseFloat(amount) / 100;

      switch (rspCode) {
        case '00':
          message = VNPAY_RESPONSE_MESSAGE.SUCCESS;
          this.eventEmitter.emit(
            'payment.success',
            new PaySuccessEvent(amount, account_id),
          );
          break;
        case '01':
          message = VNPAY_RESPONSE_MESSAGE.NOT_COMPLETE;
          break;
        case '02':
          message = VNPAY_RESPONSE_MESSAGE.ERROR;
          break;
        case '24':
          message = VNPAY_RESPONSE_MESSAGE.CANCEL;
          break;
        case '51':
          message = VNPAY_RESPONSE_MESSAGE.NOT_HAVE_ENOUGH_MONEY;
          break;
        default:
          message = 'Không xác định';
      }

      return { rspCode: rspCode, message: message };
    } else {
      return { RspCode: '97', Message: 'Mã hash không hợp lệ' };
    }
  }
}
