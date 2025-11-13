import { Server } from 'socket.io';
export declare class AttendanceGateway {
    server: Server;
    sendNewPunch(record: any): void;
}
