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
import { User } from '../users/entities/user.entity';
import { DiscountService } from '../discounts/discounts.service';
import { CloudinaryService } from 'src/config/upload/cloudinary.service';
import { plainToClass } from 'class-transformer';
import { Product } from 'src/modules/products/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly discountService: DiscountService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    dto: CreateProductDto,
    files: Express.Multer.File[] = [],
    user: User,
  ) {
    const myWallet = 100000000;

    console.log(dto);

    if (
      !(dto?.image_urls && dto.image_urls?.length) &&
      !(files && files?.length)
    ) {
      throw new BadRequestException('Chưa có ảnh sản phẩm');
    }

    const appropriateDiscount =
      await this.discountService.findCompatibleDiscountByPrice(dto.price);

    if (!appropriateDiscount) {
      throw new BadRequestException('Không tìm thấy chiết khấu phù hợp');
    }

    const discountProduct = dto.price * appropriateDiscount.discount_percent;

    if (myWallet < discountProduct) {
      throw new BadRequestException('Tài khoản không đủ tiền');
    }

    const newProduct = await this.productRepository.save(
      ProductDto.toEntity({
        ...dto,
        seller_id: user.id,
        image_urls: [],
        image_ids: [],
      }),
    );

    if (dto?.image_urls && dto.image_urls?.length) {
      for (const url of dto.image_urls) {
        const { secure_url, public_id } =
          await this.cloudinaryService.uploadFileFromUrl(url);

        newProduct.image_urls.push(secure_url);
        newProduct.image_ids.push(public_id);
      }

      await this.productRepository.findOneByAndUpdate(
        {
          where: { id: newProduct.id },
        },
        {
          image_urls: newProduct.image_urls,
          image_ids: newProduct.image_ids,
        },
      );

      await this.productRepository.save(newProduct);
    }

    if (files.length) {
      for (const file of files) {
        console.log('file', file);

        const { secure_url, public_id } =
          await this.cloudinaryService.uploadFile(file);

        newProduct.image_urls.push(secure_url);
        newProduct.image_ids.push(public_id);
      }

      await this.productRepository.findOneByAndUpdate(
        {
          where: { id: newProduct.id },
        },
        {
          image_urls: newProduct.image_urls,
          image_ids: newProduct.image_ids,
        },
      );

      await this.productRepository.save(newProduct);
    }

    return newProduct;
  }

  async findAll() {
    const products = await this.productRepository.findAll();

    return products.map((product) => plainToClass(Product, product));
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
