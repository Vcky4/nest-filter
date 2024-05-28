import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../model/room.entity';
import { Repository } from 'typeorm';
import { RoomDTO } from './dto/room.dto';

@Injectable()
export class RoomService {
    constructor(@InjectRepository(Room) private readonly repo: Repository<Room>) { }

    public async getAll() {
        return await this.repo.find()
            .then(rooms => rooms.map(e => RoomDTO.fromEntity(e)));
    }
}
