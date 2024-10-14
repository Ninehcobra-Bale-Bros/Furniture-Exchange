import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Request } from 'express';
import { RoleGuard } from 'src/common/guards/role.guard';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/role.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('conversations')
@ApiTags('conversations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  // @Post()
  // @ApiOperation({
  //   summary: '[BUYER, SELLER, ADMIN] create a conversation (OPTIONAL)',
  // })
  // @Roles(RoleEnum.BUYER, RoleEnum.SELLER, RoleEnum.ADMIN)
  // create(@Body() dto: CreateConversationDto) {
  //   return this.conversationsService.create(dto);
  // }

  // @Post('messages')
  // @ApiOperation({
  //   summary:
  //     '[ADMIN] FOR TESTING ONLY - Create a message will automatically using websocket',
  // })
  // @Roles(RoleEnum.ADMIN)
  // createMessage(@Body() dto: CreateMessageDto, @Req() req: Request) {
  //   return this.conversationsService.createMessage(dto, req.user);
  // }

  @Get()
  @ApiOperation({
    summary: '[BUYER, SELLER, ADMIN] Get all conversations of the user',
  })
  @Roles(RoleEnum.BUYER, RoleEnum.SELLER, RoleEnum.ADMIN)
  getLastMessageOfAllConversation(@Req() req: Request) {
    return this.conversationsService.getLastMessageOfAllConversation(req.user);
  }

  @Get('write-to-file')
  @ApiOperation({
    summary: '[ADMIN] DO NOT USE THIS ENDPOINT',
  })
  @Roles(RoleEnum.ADMIN)
  writeToFile() {
    console.log('write to file');

    return this.conversationsService.writeToFile();
  }

  @Get(':product_id')
  @ApiOperation({
    summary: '[BUYER, SELLER, ADMIN] Get conversation by product id',
  })
  @Roles(RoleEnum.BUYER, RoleEnum.SELLER, RoleEnum.ADMIN)
  getConversationByProductId(
    @Param('product_id') product_id: string,
    @Req() req: Request,
  ) {
    return this.conversationsService.GetConversationByProductId(
      product_id,
      req.user,
    );
  }

  @Get(':other_id')
  @ApiOperation({
    summary: '[BUYER, SELLER, ADMIN] Get conversation by other user',
  })
  @Roles(RoleEnum.BUYER, RoleEnum.SELLER, RoleEnum.ADMIN)
  getConversationByOtherId(
    @Param('other_id') other_id: string,
    @Req() req: Request,
  ) {
    return this.conversationsService.getConversationWithOther(
      req.user,
      other_id,
    );
  }
}
