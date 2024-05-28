import { Controller, Get, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDTO } from './dto/room.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('room')
@ApiTags('room')
export class RoomController {
    constructor(private serv: RoomService) { }

    @Get()
    @ApiResponse({ type: [RoomDTO] })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @ApiQuery({ name: 'filters', required: false })
    @ApiQuery({ name: 'sort', required: false })
    public async getAll(
        @Query('page') page: string,
        @Query('limit') limit: string,
        @Query('filters') filters: string,
        @Query('sort') sorts: string
    ): Promise<RoomDTO[]> {
        return await this.serv.getAll(page, limit, filters, sorts);
    }
}
