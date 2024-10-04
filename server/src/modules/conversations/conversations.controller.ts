import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
  create(@Body() dto: CreateConversationDto) {
    return this.conversationsService.create(dto);
  }

  @Post('messages')
  createMessage(@Body() dto: CreateMessageDto, @Req() req: Request) {
    return this.conversationsService.createMessage(dto, req.user);
  }

  @Get()
  findAll() {
    return this.conversationsService.findAll();
  }
}
