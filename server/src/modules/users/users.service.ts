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

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository, // Inject Repository
    private readonly redis: RedisService, // Inject RedisService
  ) {}

  async findAll(): Promise<UserDto[]> {
    return await this.userRepository
      .findAll()
      .then((users) => users.map((user) => UserDto.fromEntity(user)));
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({
      where: {
        email: email,
      },
    });

    return user;
  }

  async create(dto: CreateUserDto): Promise<UserDto> {
    const newUser = await this.userRepository.save(UserDto.toEntity(dto));

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
}
