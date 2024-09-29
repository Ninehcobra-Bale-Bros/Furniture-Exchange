import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './repository/product.repository';
import * as fs from 'fs';
import * as path from 'path';
import { ProductDto } from 'src/modules/products/dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  create(createProductDto: CreateProductDto, files: Express.Multer.File[]) {
    console.log(createProductDto);

    console.log(files);

    return createProductDto;
  }

  async findAll() {
    const products = await this.productRepository.findAll();

    return products.map((product) => ProductDto.fromEntity(product));
  }

  async writeToFile() {
    const products = await this.productRepository.findAll();

    const filePath = path.resolve('db/seeds/products/products.json');

    fs.writeFile(filePath, JSON.stringify(products), (err) => {
      if (err) {
        throw new InternalServerErrorException(
          `Error writing to file: ${err.message}`,
        );
      }
    });

    return 'Write to file successfully';
  }
}
