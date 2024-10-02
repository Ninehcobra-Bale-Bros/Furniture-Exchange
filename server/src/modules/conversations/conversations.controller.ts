import { Controller, Get, Post, Body } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('conversations')
@ApiTags('conversations')
@ApiBearerAuth()
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  create(@Body() dto: CreateConversationDto) {
    return this.conversationsService.create(dto);
  }

  @Post('messages')
  createMessage(@Body() dto: CreateMessageDto) {
    return this.conversationsService.createMessage(dto);
  }

  @Get()
  findAll() {
    return this.conversationsService.findAll();
  }
}
