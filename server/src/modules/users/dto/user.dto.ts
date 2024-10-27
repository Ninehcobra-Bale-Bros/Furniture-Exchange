import { IsBoolean, IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';
import { User } from '../entities/user.entity';
import { RoleEnum } from 'src/common/enums/role.enum';
import { SexEnum } from 'src/common/enums/sex.enum';
import { Exclude, plainToClass, Transform } from 'class-transformer';
import { UUID } from 'crypto';

export class UserDto implements Readonly<UserDto> {
  id: UUID & { __brand: 'userId' };
  _id?: string;
  CCCD: string;
  email: string;
  email_verified: boolean;

  @Exclude({
    toClassOnly: true,
  })
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  sex: SexEnum;
  role: RoleEnum;
  address_line1: string;
  address_line2: string;

  @Transform(
    ({ value }) => {
      if (typeof value === 'string' && value.match(/"([^"]+)"/g)) {
        return value
          .match(/"([^"]+)"/g)
          .map((s: string) => s.replace(/"/g, ''))[0];
      }

      return value;
    },
    { toClassOnly: true },
  )
  image_url: string;

  @Transform(
    ({ value }) => {
      if (typeof value === 'string' && value.match(/"([^"]+)"/g)) {
        return value
          .match(/"([^"]+)"/g)
          .map((s: string) => s.replace(/"/g, ''))[0];
      }

      return value;
    },
    { toClassOnly: true },
  )
  image_id: string;

  public static from(dto: Partial<UserDto>) {
    const it = new UserDto();

    it.id = dto.id;
    it._id = dto._id;
    it.CCCD = dto.CCCD;
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
      _id: entity.id,
      CCCD: entity.CCCD,
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
    const it = new User();

    it.id = dto.id;
    it.CCCD = dto.CCCD;
    it.email = dto.email;
    it.email_verified = dto.email_verified;
    it.password = dto.password;
    it.first_name = dto.first_name;
    it.last_name = dto.last_name;
    it.image_url = dto.image_url;
    it.image_id = dto.image_id;
    it.phone_number = dto.phone_number;
    it.sex = dto.sex;
    it.role = dto.role ?? RoleEnum.BUYER;
    it.address_line1 = dto.address_line1;
    it.address_line2 = dto.address_line2;

    return it;
  }
}
