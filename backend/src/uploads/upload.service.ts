import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import { fileTypeFromBuffer } from 'file-type';


dotenv.config();

@Injectable()
export class UploadService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  /**
   * Upload a raw file buffer (from NestJS FileInterceptor)
   */
  generateSignedUrl(
    fullUrl: string,
    format = 'pdf',
    expiresInSeconds = 600,
    forceDownload = false,
  ): string {
    if (!fullUrl) return null;

    // ✅ Extract clean public_id directly from the URL
    const match = fullUrl.match(
      /\/upload\/(?:v\d+\/)?(.+)\.pdf$/
    );
    const publicId = match ? match[1] : null;

    if (!publicId) {
      console.error('❌ Could not extract Cloudinary public_id from URL:', fullUrl);
      return null;
    }

    const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;

    // ✅ Generate proper signed download URL
    return cloudinary.utils.private_download_url(publicId, format, {
      resource_type: 'raw',
      type: 'authenticated',
      expires_at: expiresAt,
      attachment: forceDownload ? true : false,
    });    
  }

  async uploadBuffer(
    buffer: Buffer,
    folder = 'sahu_construction',
    filename?: string,
  ): Promise<{ secure_url: string }> {
    // Detect the file type from buffer
    const detected = await fileTypeFromBuffer(buffer);
    const isPDF = detected?.mime === 'application/pdf';
  
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: filename || `file-${Date.now()}`,
          resource_type: isPDF ? 'raw' : 'auto',
          format: isPDF ? 'pdf' : undefined,
          type: 'upload', // ✅ Make file publicly accessible
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result as any);
          }
        },
      );      
  
      stream.end(buffer);
    });
  }
  

  /**
   * Upload file by path (if file is stored locally)
   */
  async uploadToCloudinary(
    filePath: string,
    folder = 'sahu_construction',
  ): Promise<{ secure_url: string }> {
    try {
      return (await cloudinary.uploader.upload(filePath, {
        folder,
        resource_type: 'auto',
      })) as any;
    } catch (err) {
      console.error('Cloudinary upload failed:', err);
      throw err;
    }
  }
}
