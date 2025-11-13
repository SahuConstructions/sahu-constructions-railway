export declare class CreateAttendanceDto {
    type: 'IN' | 'OUT';
    timestamp: string;
    lat?: number;
    lng?: number;
    deviceId?: string;
    selfieUrl?: string;
    location?: string;
}
