import { VNPAY_URL } from 'src/environments';

export const VNPAY_CONSTANT = {
  VNPAY_URL: VNPAY_URL,
};

export const VNPAY_RESPONSE_CODE = {
  SUCCESS: '00',
  NOT_COMPLETE: '01',
  ERROR: '02',
  CANCEL: '24',
  NOT_HAVE_ENOUGH_MONEY: '51',
};

export const VNPAY_RESPONSE_MESSAGE = {
  SUCCESS: 'Giao dịch thành công',
  NOT_COMPLETE: 'Giao dịch chưa hoàn tất',
  ERROR: 'Giao dịch bị lỗi',
  CANCEL: '	Giao dịch không thành công do: Khách hàng hủy giao dịch',
  NOT_HAVE_ENOUGH_MONEY:
    'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
};
