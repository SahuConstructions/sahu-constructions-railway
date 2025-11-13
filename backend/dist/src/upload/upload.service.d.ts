export declare class UploadService {
    constructor();
    uploadBuffer(buffer: Buffer, folder?: string): Promise<unknown>;
    uploadToCloudinary(filePath: string, folder?: string): Promise<import("cloudinary").UploadApiResponse>;
}
