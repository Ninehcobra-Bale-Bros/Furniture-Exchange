import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UPLOAD_CONSTANTS } from 'src/common/constants/upload.constant';

@Controller('products')
@ApiTags('products')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor(
      'image_files',
      UPLOAD_CONSTANTS.MAX_UPLOAD_MULTIPLE_FILES,
      {
        limits: {
          fileSize: UPLOAD_CONSTANTS.MAX_FILE_SIZE,
        },
        fileFilter: (req, file, callback) => {
          const allowedMimeTypes =
            UPLOAD_CONSTANTS.VALID_UPLOADS_MIME_TYPES.map((type) =>
              type.toString(),
            );

          if (allowedMimeTypes.includes(file.mimetype)) {
            callback(null, true); // Accept the file
          } else {
            callback(
              new BadRequestException(
                'Invalid file type. Only image files are allowed: ' +
                  UPLOAD_CONSTANTS.VALID_UPLOADS_MIME_TYPES.join(', '),
              ),
              false,
            ); // Reject the file
          }
        },
      },
    ),
  )
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto, files);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('write-to-file')
  writeToFile() {
    return this.productsService.writeToFile();
  }
}
