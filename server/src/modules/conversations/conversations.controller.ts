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

@Controller('conversations')
@ApiTags('conversations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @ApiOperation({
    summary: 'OPTIONAL',
  })
  create(@Body() dto: CreateConversationDto) {
    return this.conversationsService.create(dto);
  }

  @Post('messages')
  @ApiOperation({
    summary: 'FOR TESTING ONLY',
  })
  createMessage(@Body() dto: CreateMessageDto, @Req() req: Request) {
    return this.conversationsService.createMessage(dto, req.user);
  }

  @Get()
  GetAllConversations(@Req() req: Request) {
    return this.conversationsService.GetAllConversations(req.user);
  }

  @Get(':product_id/product')
  GetConversationByProductId(
    @Param('product_id') product_id: string,
    @Req() req: Request,
  ) {
    return this.conversationsService.GetConversationByProductId(
      product_id,
      req.user,
    );
  }

  @Get(':other_id/user')
  GetConversationByOtherId(
    @Param('other_id') other_id: string,
    @Req() req: Request,
  ) {
    return this.conversationsService.GetConversationByOtherId(
      req.user,
      other_id,
    );
  }
}
