import { BadRequestException, Injectable } from '@nestjs/common';
import { sortObject, vnpayParamsBuilder } from 'src/utils';
import * as crypto from 'crypto';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { VNPAY_HASH_SECRET } from 'src/environments';
dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class VnpayService {
  constructor() {}

  createPaymentUrl(ipAddr: string, amount: string) {
    if (!parseFloat(amount)) {
      throw new BadRequestException('Amount must be a number');
    }

    const createDate = dayjs().tz('Asia/Ho_Chi_Minh').format('YYYYMMDDHHmmss');

    const expireDate = dayjs()
      .tz('Asia/Ho_Chi_Minh')
      .add(1, 'day')
      .format('YYYYMMDDHHmmss');

    const vnpUrl = vnpayParamsBuilder(ipAddr, parseFloat(amount), createDate);

    return vnpUrl;
  }

  ipn(query: any) {
    console.log(query);

    var vnp_Params = query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var querystring = require('qs');

    var signData = querystring.stringify(vnp_Params, { encode: false });

    var crypto = require('crypto');

    var hmac = crypto.createHmac('sha512', VNPAY_HASH_SECRET);

    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      var orderId = vnp_Params['vnp_TxnRef'];
      var rspCode = vnp_Params['vnp_ResponseCode'];

      return { RspCode: '00', Message: 'success' };
    } else {
      return { RspCode: '97', Message: 'Fail checksum' };
    }
  }
}
