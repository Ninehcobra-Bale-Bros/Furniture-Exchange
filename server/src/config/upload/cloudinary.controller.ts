import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UPLOAD_CONSTANTS } from 'src/common/constants/upload.constant';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';

@Controller('cloudinary')
@ApiTags('cloudinary')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Post('single')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: UPLOAD_CONSTANTS.MAX_FILE_SIZE }, // 1MB
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = UPLOAD_CONSTANTS.VALID_UPLOADS_MIME_TYPES.map(
          (type) => type.toString(),
        );

        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true); // Accept the file
        } else {
          callback(
            new BadRequestException(
              'Invalid file type. Only image files are allowed.' +
                UPLOAD_CONSTANTS.VALID_UPLOADS_MIME_TYPES.join(', '),
            ),
            false,
          ); // Reject the file
        }
      },
    }),
  )
  @ApiOperation({
    summary: '[ADMIN] Upload a single image (FOR TESTING ONLY)',
    description: 'Upload a single image to Cloudinary',
  })
  @Roles(RoleEnum.ADMIN)
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return await this.cloudinaryService.uploadFile(file).catch((err) => {
      throw new BadRequestException(err);
    });
  }

  @Post('multiple')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('images', UPLOAD_CONSTANTS.MAX_UPLOAD_MULTIPLE_FILES, {
      limits: {
        fileSize: UPLOAD_CONSTANTS.MAX_FILE_SIZE,
      },
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = UPLOAD_CONSTANTS.VALID_UPLOADS_MIME_TYPES.map(
          (type) => type.toString(),
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
    }),
  )
  @ApiOperation({
    summary: '[ADMIN] Upload multiple images (FOR TESTING ONLY)',
    description: 'Upload multiple images to Cloudinary',
  })
  @Roles(RoleEnum.ADMIN)
  uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('At least one file is required.');
    }

    const urls = Promise.all(
      files.map(async (file) => {
        const { secure_url } = await this.cloudinaryService
          .uploadFile(file)
          .catch((err) => {
            throw new BadRequestException(err);
          });

        return secure_url;
      }),
    );

    return urls;
  }

  @Post('url')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
        },
      },
    },
  })
  @ApiOperation({
    summary: '[ADMIN] Upload an image from URL (FOR TESTING ONLY)',
    description: 'Upload an image from URL to Cloudinary',
  })
  @Roles(RoleEnum.ADMIN)
  async uploadImageFromUrl(@Body('url') url: string) {
    return await this.cloudinaryService.uploadFileFromUrl(url).catch((err) => {
      throw new BadRequestException(err);
    });
  }

  @Post('urls')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        urls: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  })
  @ApiOperation({
    summary: '[ADMIN] Upload multiple images from URLs (FOR TESTING ONLY)',
    description: 'Upload multiple images from URLs to Cloudinary',
  })
  @Roles(RoleEnum.ADMIN)
  uploadImagesFromUrls(@Body('urls') urls: string[]) {
    if (!urls || urls.length === 0) {
      throw new BadRequestException('At least one URL is required.');
    }

    const uploadedUrls = Promise.all(
      urls.map(async (url) => {
        const { secure_url } = await this.cloudinaryService
          .uploadFileFromUrl(url)
          .catch((err) => {
            throw new BadRequestException(err);
          });

        return secure_url;
      }),
    );

    return uploadedUrls;
  }

  @Delete('single')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        publicId: {
          type: 'string',
        },
      },
    },
  })
  @ApiOperation({
    summary: '[ADMIN] Delete an image (FOR TESTING ONLY)',
    description: 'Delete an image from Cloudinary',
  })
  @Roles(RoleEnum.ADMIN)
  async deleteImage(@Body('publicId') publicId: string) {
    return await this.cloudinaryService.deleteFile(publicId).catch((err) => {
      throw new BadRequestException(err);
    });
  }

  @Delete('multiple')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        publicIds: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  })
  @ApiOperation({
    summary: '[ADMIN] Delete multiple images (FOR TESTING ONLY)',
    description: 'Delete multiple images from Cloudinary',
  })
  @Roles(RoleEnum.ADMIN)
  deleteImages(@Body('publicIds') publicIds: string[]) {
    if (!publicIds || publicIds.length === 0) {
      throw new BadRequestException('At least one public ID is required.');
    }

    const deletedImages = Promise.all(
      publicIds.map(async (publicId) => {
        const { result } = await this.cloudinaryService
          .deleteFile(publicId)
          .catch((err) => {
            throw new BadRequestException(err);
          });

        return result;
      }),
    );

    return deletedImages;
  }
}
