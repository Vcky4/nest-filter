import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../model/room.entity';
import { Repository } from 'typeorm';
import { RoomDTO } from './dto/room.dto';
import { applyFilters, applyPagination, applySorting } from '../utils/typeorm-utils';


@Injectable()
export class RoomService {
    constructor(@InjectRepository(Room) private readonly repo: Repository<Room>) { }

    public async getAll(page: string, limit: string, filters: string, sorts: string) {
        let query = this.repo.createQueryBuilder('room');
        query = applyFilters(query, filters);
        query = applySorting(query, sorts);
        query = applyPagination(query, page, limit);
        return await query.getMany()
            .then(rooms => rooms.map(e => RoomDTO.fromEntity(e)));
    }

    public async create(dto: RoomDTO) {
        return this.repo.save(dto.toEntity())
            .then(e => RoomDTO.fromEntity(e));
    }

    //delete all
    public async deleteAll() {
        return this.repo.clear()
    }
}
