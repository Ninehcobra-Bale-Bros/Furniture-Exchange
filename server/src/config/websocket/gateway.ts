import { Socket } from 'socket.io';
import * as utils from '../../utils';
import { UsersService } from 'src/modules/users/users.service';
import { UserDto } from 'src/modules/users/dto/user.dto';

export class Gateway {
  protected usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  async authenticate(client: Socket): Promise<UserDto> {
    const authHeader = client.handshake.headers?.authorization;

    if (!authHeader) {
      return null;
    }

    const token = authHeader.split(' ')[1];

    const payload = utils.verifyToken(token);

    if (!payload) {
      return null;
    }

    const user = await this.usersService.findOneByEmail(payload['email']);

    return user;
  }
}
