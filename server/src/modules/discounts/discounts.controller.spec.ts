import { Test, TestingModule } from '@nestjs/testing';
import { DiscountController } from './discounts.controller';
import { DiscountService } from './discounts.service';

describe('DiscountController', () => {
  let controller: DiscountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountController],
      providers: [DiscountService],
    }).compile();

    controller = module.get<DiscountController>(DiscountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
