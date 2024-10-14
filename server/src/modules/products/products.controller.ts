import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UPLOAD_CONSTANTS } from 'src/common/constants/upload.constant';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/role.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('products')
@ApiTags('products')
@UseGuards(JwtAuthGuard, RoleGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: '[SELLER, ADMIN] Create a product',
  })
  @Roles(RoleEnum.SELLER, RoleEnum.ADMIN)
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
    @Req() req: Request,
  ) {
    return this.productsService.create(createProductDto, files, req.user);
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: '[PUBLIC] Get all products',
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get('write-to-file')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '[ADMIN] DO NOT USE THIS ENDPOINT',
  })
  @Roles(RoleEnum.ADMIN)
  writeToFile() {
    return this.productsService.writeToFile();
  }

  @Get(':slug')
  @Public()
  @ApiOperation({
    summary: '[PUBLIC] Get a product by ID',
  })
  findOne(@Param('slug') id: string) {
    return this.productsService.findBySlug(id);
  }
}
