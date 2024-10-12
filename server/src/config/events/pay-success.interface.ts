export default class PaySuccessEvent {
  amount: number;
  account_id: string;

  constructor(amount: number, account_id: string) {
    this.amount = amount;
    this.account_id = account_id;
  }
}
