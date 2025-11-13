export declare class UploadService {
    constructor();
    generateSignedUrl(fullUrl: string, format?: string, expiresInSeconds?: number, forceDownload?: boolean): string;
    uploadBuffer(buffer: Buffer, folder?: string, filename?: string): Promise<{
        secure_url: string;
    }>;
    uploadToCloudinary(filePath: string, folder?: string): Promise<{
        secure_url: string;
    }>;
}
