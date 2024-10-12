import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';

export class RegisterSellingDto extends PartialType(UserDto) {
  @ApiProperty({
    type: 'string',
    example: 'John',
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    type: 'string',
    example: 'Doe',
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    type: 'string',
    example: '1234567890',
  })
  @IsPhoneNumber('VN')
  phone_number: string;

  @ApiProperty({
    type: 'string',
    example: '68A, Kha Vạn Cân, Linh Đông, Thủ Đức, Hồ Chí Minh',
  })
  @IsString()
  address_line1: string;

  @ApiProperty({
    type: 'string',
    example: '1060, Kha Vạn Cân, Linh Chiểu, Thủ Đức, Hồ Chí Minh',
  })
  @IsString()
  address_line2: string;
}
