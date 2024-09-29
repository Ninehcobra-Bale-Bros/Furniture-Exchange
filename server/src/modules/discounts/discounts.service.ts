import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { DiscountDto } from './dto/discount.dto';
import * as fs from 'fs';
import * as path from 'path';
import { DiscountRepository } from './repository/discount.repository';

@Injectable()
export class DiscountService {
  constructor(private readonly discountRepository: DiscountRepository) {}

  async create(dto: CreateDiscountDto) {
    dto = {
      ...dto,
      discount_percent: dto.discount_percent / 100,
    };

    const newDiscount = await this.discountRepository.save(
      DiscountDto.toEntity(dto),
    );

    return DiscountDto.fromEntity(newDiscount);
  }

  async findCompatibleDiscountByPrice(price: number) {
    const discount =
      await this.discountRepository.findCompatibleDiscountByPrice(price);

    console.log(discount);

    return DiscountDto.fromEntity(discount);
  }

  async findAll() {
    const discounts = await this.discountRepository.findAll();

    return discounts.map((discount) => DiscountDto.fromEntity(discount));
  }

  async writeToFile() {
    const discounts = await this.discountRepository.findAll();

    const filePath = path.resolve('db/seeds/discounts/discounts.json');

    fs.writeFile(filePath, JSON.stringify(discounts), (err) => {
      if (err) {
        throw new InternalServerErrorException(
          `Error writing to file: ${err.message}`,
        );
      }
    });

    return 'Write to file successfully';
  }
}
