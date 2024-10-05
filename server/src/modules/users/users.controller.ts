import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Request } from 'express';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: '[ADMIN] Get all users',
  })
  @Roles(RoleEnum.ADMIN)
  async findAll(@Req() req: Request): Promise<UserDto[]> {
    return await this.usersService.findAll();
  }

  @Get('write-to-file')
  @ApiOperation({
    summary: '[ADMIN] DO NOT USE THIS ENDPOINT',
  })
  @Roles(RoleEnum.ADMIN)
  async writeToFile(): Promise<void> {
    await this.usersService.findAllAndWriteToFile();
  }
}
