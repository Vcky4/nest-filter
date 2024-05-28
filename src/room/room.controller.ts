import { Controller, Get } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDTO } from './dto/room.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('room')
@ApiTags('room')
export class RoomController {
    constructor(private serv: RoomService) { }

    @Get()
    @ApiResponse({ type: [RoomDTO] })
    public async getAll(): Promise<RoomDTO[]> {
        return await this.serv.getAll();
    }
}
