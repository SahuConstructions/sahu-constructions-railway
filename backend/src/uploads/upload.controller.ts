import { Controller, Post, UploadedFile, UseInterceptors, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // ✅ Generic Cloudinary upload endpoint (image/pdf)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(), // keeps file in buffer instead of saving locally
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder: string,
  ) {
    if (!file) throw new Error('No file uploaded');
    const result = await this.uploadService.uploadBuffer(file.buffer, folder || 'sahu_construction');
    return { url: result.secure_url };
  }
}
