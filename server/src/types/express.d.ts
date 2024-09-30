import { User as UserApp } from 'src/modules/users/entities/user.entity';

declare global {
  namespace Express {
    interface User extends UserApp {}
  }
}
