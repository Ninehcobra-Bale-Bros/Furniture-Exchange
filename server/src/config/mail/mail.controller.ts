import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';

@Controller('mail')
@ApiTags('mail')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class MailController {
  constructor(private readonly mailService: MailService) {}

  // @Post('demo/send-email')
  // @ApiOperation({
  //   summary: 'FOR TESTING ONLY',
  //   description: 'Send email verification with OTP',
  // })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       email: {
  //         type: 'string',
  //         example: 'lxbach1608@gmail.com',
  //       },
  //     },
  //   },
  // })
  // @Roles(RoleEnum.ADMIN)
  // send(@Body() body: { email: string }) {
  //   return this.mailService.sendEmailVerification({
  //     to: body.email,
  //     otp: '123456',
  //     name: 'Bach Le',
  //     link: 'localhost:3000',
  //   });
  // }
}
