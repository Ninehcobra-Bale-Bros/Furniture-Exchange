import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './repository/product.repository';
import * as fs from 'fs';
import * as path from 'path';
import { ProductDto } from 'src/modules/products/dto/product.dto';
import { User } from '../users/entities/user.entity';
import { DiscountService } from '../discounts/discounts.service';
import { CloudinaryService } from 'src/config/upload/cloudinary.service';
import { PaymentsService } from 'src/modules/payments/payments.service';
import { plainToClass } from 'class-transformer';
import { CategoryDto } from '../categories/dto/category.dto';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { DiscountDto } from '../discounts/dto/discount.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly discountService: DiscountService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly paymentsService: PaymentsService,
  ) {}

  async create(
    dto: CreateProductDto,
    files: Express.Multer.File[] = [],
    user: User,
  ) {
    if (
      !(dto?.image_urls && dto.image_urls?.length) &&
      !(files && files?.length)
    ) {
      throw new BadRequestException('Chưa có ảnh sản phẩm');
    }

    const appropriateDiscount = await this.findAppropriateDiscount(dto.price);

    if (!appropriateDiscount) {
      throw new BadRequestException('Không tìm thấy chiết khấu phù hợp');
    }

    const discountProduct = dto.price * appropriateDiscount.discount_percent;

    const myAccount = await this.paymentsService.findAccountByUserId(user.id);

    if (myAccount.balance < discountProduct) {
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

    if (!newProduct) {
      throw new InternalServerErrorException('Tạo sản phẩm thất bại !');
    }

    this.paymentsService.decreaseBalance(myAccount.id, discountProduct);

    if (dto?.image_urls && dto.image_urls?.length) {
      for (const url of dto.image_urls) {
        const { secure_url, public_id } =
          await this.cloudinaryService.uploadFileFromUrl(url);

        newProduct.image_urls.push(secure_url);
        newProduct.image_ids.push(public_id);
      }

      this.productRepository.findOneByAndUpdate(
        {
          where: { id: newProduct.id },
        },
        {
          image_urls: newProduct.image_urls,
          image_ids: newProduct.image_ids,
        },
      );

      // await this.productRepository.save(newProduct);
    }

    if (files.length) {
      for (const file of files) {
        const { secure_url, public_id } =
          await this.cloudinaryService.uploadFile(file);

        newProduct.image_urls.push(secure_url);
        newProduct.image_ids.push(public_id);
      }

      this.productRepository.findOneByAndUpdate(
        {
          where: { id: newProduct.id },
        },
        {
          image_urls: newProduct.image_urls,
          image_ids: newProduct.image_ids,
        },
      );

      // await this.productRepository.save(newProduct);
    }

    return ProductDto.fromEntity(newProduct);
  }

  async findAppropriateDiscount(price: number): Promise<DiscountDto> {
    const appropriateDiscount =
      await this.discountService.findCompatibleDiscountByPrice(price);

    return appropriateDiscount;
  }

  async findAll() {
    const products = await this.productRepository
      .findAll({
        relations: ['category'],
        select: ['category'],
      })
      .then((products) => {
        return products.map((product) => {
          const category = plainToClass(CategoryDto, product.category);

          product = plainToClass(ProductDto, product) as Product;

          product.category = category as Category;

          return product;
        });
      });

    return products;
  }

  async findById(productId: string): Promise<ProductDto> {
    const product = await this.productRepository.findOneBy({
      where: {
        id: productId as any,
      },
    });

    return product;
  }

  async findBySlug(slug: string): Promise<ProductDto> {
    const product = await this.productRepository.findOneBy({
      where: {
        slug,
      },
    });

    return ProductDto.fromEntity(product);
  }

  async findAllOfSeller(user: User) {
    const products = await this.productRepository
      .findAll({
        where: {
          seller_id: user.id,
        },
      })
      .then((products) => {
        return products.map((product) => ProductDto.fromEntity(product));
      });

    return products;
  }

  async isProductBelongToSeller(productId: number | string, sellerId: string) {
    const founded = await this.productRepository.findOneWithCondition({
      where: {
        id: productId as any,
        seller_id: sellerId as any,
      },
    });

    return founded;
  }

  async updateQuantity(productId: number, quantity: number): Promise<boolean> {
    const product = await this.productRepository.findOneBy({
      where: {
        id: productId as any,
      },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    const updated = await this.productRepository.update(
      {
        id: product.id,
      },
      {
        quantity: (product.quantity += quantity),
      },
    );

    return updated.affected ? true : false;
  }

  async getProductOfSeller(user: User) {
    const products = await this.productRepository
      .findAll({
        where: {
          seller_id: user.id,
        },
      })
      .then((products) => {
        return products.map((product) => ProductDto.fromEntity(product));
      });

    return products;
  }

  async writeToFile() {
    console.log('Write to file');

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
