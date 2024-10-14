import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { RedisService } from 'src/config/cache/redis.service';
import * as fs from 'fs';
import * as path from 'path';
import { UserRepository } from './repository/user.repository';
import { UUID } from 'crypto';
import { AccountRepository } from '../payments/repository/account.repository';
import { PaymentsService } from '../payments/payments.service';
import { RegisterSellingDto } from './dto/register-selling.dto';
import { RoleEnum } from 'src/common/enums/role.enum';
import { User } from 'src/modules/users/entities/user.entity';
import { plainToClass } from 'class-transformer';
import { AccountDto } from 'src/modules/payments/dto/account.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository, // Inject Repository
    private readonly paymentsService: PaymentsService, // Inject AccountRepository
    private readonly redis: RedisService, // Inject RedisService
  ) {}

  async findAll(): Promise<UserDto[]> {
    return await this.userRepository
      .findAll()
      .then((users) => users.map((user) => user));
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({
      where: {
        email: email,
      },
    });

    return user;
  }

  async findOneById(id: UUID & { __brand: 'userId' }): Promise<UserDto> {
    const user = await this.userRepository
      .findOneBy({
        where: {
          id: id,
        },
      })
      .then((u) => UserDto.fromEntity(u));

    return user;
  }

  async create(dto: CreateUserDto): Promise<UserDto> {
    const newUser = await this.userRepository.save(UserDto.toEntity(dto));

    if (!newUser) {
      throw new BadRequestException('Tạo người dùng thất bại');
    }

    const account = await this.paymentsService.createAccount({
      user_id: newUser.id,
    });

    if (!account) {
      throw new BadRequestException('Tạo tài khoản thất bại');
    }

    return UserDto.fromEntity(newUser);
  }

  async updateEmailVerificationStatus(email: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.email_verified = true;

    return await this.userRepository.save(user).then((u) => {
      return UserDto.fromEntity(u);
    });
  }

  async findAllAndWriteToFile() {
    const users = await this.findAll(); // This calls your findAll method

    // Define the file path and name
    const filePath = path.resolve('db/seeds/users/users.json');

    // Write the formatted data to the file

    fs.writeFile(filePath, JSON.stringify(users), (err) => {
      if (err) {
        throw new BadRequestException(`Error writing to file: ${err.message}`);
      }
    });

    return 'Write to file successfully';
  }

  async getProfile(user: User) {
    const profile = await this.userRepository
      .findOneWithCondition({
        where: {
          id: user.id,
        },
        select: [
          'id',
          'first_name',
          'last_name',
          'email',
          'phone_number',
          'address_line1',
          'address_line2',
          'role',
        ],
      })
      .then(async (u) => {
        const account = await this.paymentsService
          .findAccountByUserId(user.id)
          .then((a) => AccountDto.fromEntity(a));

        u.account = account as any;

        return plainToClass(UserDto, u);
      });

    return profile;
  }

  async registerSelling(user: UserDto, dto: RegisterSellingDto) {
    if (user.role === RoleEnum.SELLER) {
      throw new BadRequestException('Bạn đã đăng kí bán rồi');
    }

    const account = await this.paymentsService.findAccountByUserId(user.id);

    if (!account) {
      throw new BadRequestException('Không tìm thấy tài khoản');
    }

    if (account.balance < 1200000) {
      throw new BadRequestException('Số dư không đủ');
    }

    const seller = await this.userRepository.update(
      { id: user.id },
      {
        first_name: dto.first_name,
        last_name: dto.last_name,
        CCCD: dto.CCCD,
        phone_number: dto.phone_number,
        address_line1: dto.address_line1,
        address_line2: dto.address_line2,
        role: RoleEnum.SELLER,
      },
    );

    if (!seller) {
      throw new BadRequestException('Không tìm thấy người bán');
    }

    const result = await this.paymentsService.decreaseBalance(
      account.id,
      1200000,
    );

    return {
      success: result,
    };
  }
}
