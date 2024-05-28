import { Controller, Get } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDTO } from './dto/room.dto';

@Controller('room')
export class RoomController {
    constructor(private serv: RoomService) { }

    @Get()
    public async getAll(): Promise<RoomDTO[]> {
      return await this.serv.getAll();
    }
}
