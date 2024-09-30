import { IsBoolean, IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';
import { User } from '../entities/user.entity';
import { RoleEnum } from 'src/common/enums/role.enum';
import { SexEnum } from 'src/common/enums/sex.enum';

export class UserDto implements Readonly<UserDto> {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  email_verified: boolean;

  @IsString()
  password: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  phone_number: string;

  @IsEnum(SexEnum)
  sex: SexEnum;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsString()
  image: string;

  @IsString()
  address_line1: string;

  @IsString()
  address_line2: string;

  public static from(dto: Partial<UserDto>) {
    const user = new UserDto();

    user.id = dto.id;
    user.email = dto.email;
    user.email_verified = dto.email_verified;
    user.password = dto.password;
    user.first_name = dto.first_name;
    user.last_name = dto.last_name;
    user.image = dto.image;
    user.phone_number = dto.phone_number;
    user.sex = dto.sex;
    user.role = dto.role;
    user.address_line1 = dto.address_line1;
    user.address_line2 = dto.address_line2;

    return user;
  }

  public static fromEntity(entity: User) {
    return this.from({
      id: entity.id,
      email: entity.email,
      email_verified: entity.email_verified,
      password: entity.password,
      first_name: entity.first_name,
      last_name: entity.last_name,
      image: entity.image,
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
    user.image = dto.image;
    user.phone_number = dto.phone_number;
    user.sex = dto.sex;
    user.role = dto.role ?? RoleEnum.BUYER;
    user.address_line1 = dto.address_line1;
    user.address_line2 = dto.address_line2;

    return user;
  }
}
