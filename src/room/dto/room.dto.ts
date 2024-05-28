import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, } from 'class-validator';
import { Room } from '../../model/room.entity';

export class RoomDTO implements Readonly<RoomDTO> {
    @ApiProperty({ required: true })
    id: number;

    @ApiProperty({ required: true })
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @IsNumber()
    capacity: number;

    @ApiProperty({ required: true })
    @IsNumber()
    userId: number;

    public static from(dto: Partial<RoomDTO>) {
        const it = new RoomDTO();
        it.id = dto.id;
        it.name = dto.name;
        it.capacity = dto.capacity;
        it.userId = dto.userId;
        return it;
    }

    public static fromEntity(entity: Room) {
        return this.from({
            id: entity.id,
            name: entity.name,
            capacity: entity.capacity,
            userId: entity.userId
        });
    }

    public toEntity() {
        const it = new Room();
        it.id = this.id;
        it.name = this.name;
        it.capacity = this.capacity;
        it.userId = this.userId;
        return it;
    }
}