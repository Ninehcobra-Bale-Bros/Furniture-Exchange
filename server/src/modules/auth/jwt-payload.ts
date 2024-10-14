import { RoleEnum } from 'src/common/enums/role.enum';
import { UserDto } from '../users/dto/user.dto';
import { UUID } from 'crypto';

export class JwtPayload implements Readonly<JwtPayload>, Partial<UserDto> {
  id: UUID & { __brand: 'userId' };
  _id?: string;
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  role: RoleEnum;
}
