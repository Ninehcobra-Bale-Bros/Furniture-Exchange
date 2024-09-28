import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { Repository } from 'typeorm';
import { DiscountDto } from './dto/discount.dto';
import * as fs from 'fs';
import * as path from 'path';
import { DiscountRepository } from './repository/discount.repository';

@Injectable()
export class DiscountService {
  constructor(private readonly discountRepository: DiscountRepository) {}

  async create(dto: CreateDiscountDto) {
    const newCategory = await this.discountRepository.save(
      DiscountDto.toEntity(dto),
    );

    return DiscountDto.fromEntity(newCategory);
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
