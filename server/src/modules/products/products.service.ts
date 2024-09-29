import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './repository/product.repository';
import * as fs from 'fs';
import * as path from 'path';
import { ProductDto } from 'src/modules/products/dto/product.dto';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/entities/user.entity';
import { DiscountService } from '../discounts/discounts.service';
import { CloudinaryService } from 'src/config/upload/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly discountService: DiscountService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[] = [],
    user: User,
  ) {
    const myWallet = 100000000;

    const appropriateDiscount =
      await this.discountService.findCompatibleDiscountByPrice(
        createProductDto.price,
      );

    if (!appropriateDiscount) {
      throw new BadRequestException('No discount found');
    }

    const discount =
      createProductDto.price * appropriateDiscount.discount_percent;

    if (myWallet < discount) {
      throw new BadRequestException('Not enough money');
    }

    const newProduct = await this.productRepository.save(
      ProductDto.toEntity({
        ...createProductDto,
        seller_id: user.id,
        image_urls: [],
        image_ids: [],
      }),
    );

    return newProduct;
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
