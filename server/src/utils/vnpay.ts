import { VNPAY_HASH_SECRET, VNPAY_TMN_CODE, VNPAY_URL } from 'src/environments';
import * as crypto from 'crypto';
import * as querystring from 'qs';

interface VNPayParams {
  vnp_Amount: string;
  vnp_Command?: string; // Optional parameter with a default value
  vnp_CreateDate: any;
  vnp_CurrCode?: string; // Optional parameter with a default value
  vnp_ExpireDate: any;
  vnp_IpAddr: string;
  vnp_Locale?: string; // Optional parameter with a default value
  vnp_OrderInfo: string;
  vnp_OrderType: string; // Optional parameter with a default value
  vnp_ReturnUrl: string;
  vnp_TmnCode: string;
  vnp_TxnRef: string;
  vnp_Version: string;
  vnp_SecureHash: any;
  vnp_BankCode: string;
}

export const vnpayParamsBuilder = (
  ipAddr: string,
  amount: number,
  createDate: string,
  returnUrl: string = 'http://localhost:3001/api-docs',
): string => {
  let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

  var vnp_Params = {};
  vnp_Params['vnp_Version'] = '2.1.0';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = VNPAY_TMN_CODE;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params['vnp_Locale'] = 'vn';
  vnp_Params['vnp_CurrCode'] = 'VND';
  vnp_Params['vnp_TxnRef'] = Date.now().toString();
  vnp_Params['vnp_OrderInfo'] = 'Nap tien cho tai khoan';
  vnp_Params['vnp_OrderType'] = 'billpayment';
  vnp_Params['vnp_Amount'] = amount * 100;
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_IpAddr'] = ipAddr;
  vnp_Params['vnp_CreateDate'] = createDate;
  // vnp_Params['vnp_BankCode'] = 'NCB';

  vnp_Params = sortObject(vnp_Params);

  var querystring = require('qs');

  var signData = querystring.stringify(vnp_Params, { encode: false });

  var crypto = require('crypto');

  var hmac = crypto.createHmac('sha512', VNPAY_HASH_SECRET);

  var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  vnp_Params['vnp_SecureHash'] = signed;

  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

  return vnpUrl;
};

export const signedParams = (vnp_Params: object): any => {
  var secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  var signData = querystring.stringify(vnp_Params, { encode: false });

  var hmac = crypto.createHmac('sha512', VNPAY_HASH_SECRET);

  var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  return {
    secureHash,
    signed,
    vnp_Params,
  };
};

export const sortObject = (obj: any) => {
  var sorted = {};
  var str = [];
  var key;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }

  str.sort();

  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }

  return sorted;
};
