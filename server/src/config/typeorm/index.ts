import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import CategorySeeder from 'db/seeds/categories/category.seed';
import DiscountSeeder from 'db/seeds/discounts/discount.seed';
import ProductSeeder from 'db/seeds/products/product.seed';
import UserSeeder from 'db/seeds/users/user.seed';
import { EnvVariables } from 'src/environments/env.interface';
import { Discount } from 'src/modules/discounts/entities/discount.entity';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'bale',
  password: 'bale',
  database: 'FurnitureExchange',
  entities: ['dist/**/*.entity{.js,.ts}'],
  migrations: ['dist/db/migrations/*{.js,.ts}'],
  seeds: [UserSeeder, DiscountSeeder, CategorySeeder, ProductSeeder],
  synchronize: false, // Ensure this is set to false in production
};

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(ConfigService) private readonly config: ConfigService<EnvVariables>,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get('POSTGRES_HOST'),
      port: +this.config.get('POSTGRES_PORT'),
      username: this.config.get('POSTGRES_USER'),
      password: this.config.get('POSTGRES_PASSWORD'),
      database: this.config.get('POSTGRES_DATABASE'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/db/migrations/*{.ts,.js}'],
      autoLoadEntities: true,
      // synchronize: this.config.get('NODE_ENV') === 'development' ? true : false,
      synchronize: true,
    };
  }
}
