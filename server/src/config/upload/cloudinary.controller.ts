import { Controller, Get } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Controller()
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Get()
  upload() {}
}
