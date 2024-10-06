import { IsBoolean, IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';
import { User } from '../entities/user.entity';
import { RoleEnum } from 'src/common/enums/role.enum';
import { SexEnum } from 'src/common/enums/sex.enum';
import { plainToClass, Transform } from 'class-transformer';

export class UserDto implements Readonly<UserDto> {
  id: string;
  email: string;
  email_verified: boolean;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  sex: SexEnum;
  role: RoleEnum;

  @Transform(
    ({ value }) => {
      return value
        .match(/"([^"]+)"/g)
        .map((s: string) => s.replace(/"/g, ''))[0];
    },
    { toClassOnly: true },
  )
  image_url: string;

  @Transform(
    ({ value }) => {
      return value
        .match(/"([^"]+)"/g)
        .map((s: string) => s.replace(/"/g, ''))[0];
    },
    { toClassOnly: true },
  )
  image_id: string;
  address_line1: string;
  address_line2: string;

  public static from(dto: Partial<UserDto>) {
    const it = new UserDto();

    it.id = dto.id;
    it.email = dto.email;
    it.email_verified = dto.email_verified;
    it.first_name = dto.first_name;
    it.last_name = dto.last_name;
    it.image_url = dto.image_url;
    it.image_id = dto.image_id;
    it.phone_number = dto.phone_number;
    it.sex = dto.sex;
    it.role = dto.role;
    it.address_line1 = dto.address_line1;
    it.address_line2 = dto.address_line2;

    return plainToClass(UserDto, it);
  }

  public static fromEntity(entity: User) {
    return this.from({
      id: entity.id,
      email: entity.email,
      email_verified: entity.email_verified,
      first_name: entity.first_name,
      last_name: entity.last_name,
      image_url: entity.image_url,
      image_id: entity.image_id,
      phone_number: entity.phone_number,
      sex: entity.sex,
      role: entity.role,
      address_line1: entity.address_line1,
      address_line2: entity.address_line2,
    });
  }

  public static toEntity(dto: Partial<User>) {
    const user = new User();

    user.email = dto.email;
    user.email_verified = dto.email_verified;
    user.password = dto.password;
    user.first_name = dto.first_name;
    user.last_name = dto.last_name;
    user.image_url = dto.image_url;
    user.image_id = dto.image_id;
    user.phone_number = dto.phone_number;
    user.sex = dto.sex;
    user.role = dto.role ?? RoleEnum.BUYER;
    user.address_line1 = dto.address_line1;
    user.address_line2 = dto.address_line2;

    return user;
  }
}
