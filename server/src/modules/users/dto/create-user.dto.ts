import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { UserDto } from './user.dto';

export class CreateUserDto extends PartialType(UserDto) {
  id?: User['id'];
}
