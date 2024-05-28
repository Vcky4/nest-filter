import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'room' })
export class Room {
    @PrimaryColumn()
    id: number;

    @Column({ type: 'varchar', length: 300 })
    name: string;

    @Column({ type: 'int', default: 0 })
    capacity: number;

    @Column({ type: 'int', name: 'userId', default: 0 })
    userId: number;
}