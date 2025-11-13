"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const dotenv = require("dotenv");
const file_type_1 = require("file-type");
dotenv.config();
let UploadService = class UploadService {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });
    }
    generateSignedUrl(fullUrl, format = 'pdf', expiresInSeconds = 600, forceDownload = false) {
        if (!fullUrl)
            return null;
        const match = fullUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.pdf$/);
        const publicId = match ? match[1] : null;
        if (!publicId) {
            console.error('❌ Could not extract Cloudinary public_id from URL:', fullUrl);
            return null;
        }
        const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;
        return cloudinary_1.v2.utils.private_download_url(publicId, format, {
            resource_type: 'raw',
            type: 'authenticated',
            expires_at: expiresAt,
            attachment: forceDownload ? true : false,
        });
    }
    async uploadBuffer(buffer, folder = 'sahu_construction', filename) {
        const detected = await (0, file_type_1.fileTypeFromBuffer)(buffer);
        const isPDF = detected?.mime === 'application/pdf';
        return new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({
                folder,
                public_id: filename || `file-${Date.now()}`,
                resource_type: isPDF ? 'raw' : 'auto',
                format: isPDF ? 'pdf' : undefined,
                type: 'upload',
            }, (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
            stream.end(buffer);
        });
    }
    async uploadToCloudinary(filePath, folder = 'sahu_construction') {
        try {
            return (await cloudinary_1.v2.uploader.upload(filePath, {
                folder,
                resource_type: 'auto',
            }));
        }
        catch (err) {
            console.error('Cloudinary upload failed:', err);
            throw err;
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
//# sourceMappingURL=upload.service.js.map