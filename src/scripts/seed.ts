import * as _ from 'lodash';
import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../config/config.service';
import { RoomService } from '../room/room.service';
import { Room } from '../model/room.entity';
import { seed } from '../seed.data'
import { RoomDTO } from 'src/room/dto/room.dto';

async function run() {

    const opt = {
        ...configService.getTypeOrmConfig(),
        debug: true
    };

    const connection = await createConnection(opt as ConnectionOptions);
    const roomService = new RoomService(connection.getRepository(Room));

    //clear db
    console.log('clearing tables...')
    try{
        await roomService.deleteAll()
    }catch(err){
        console.error(err)
    }
    console.log('Adding new data...')
    const work = seed.map(dto => roomService.create(RoomDTO.from(dto))
        .then(r => (console.log('done ->', r.name), r)))

    return await Promise.all(work);
}

run()
  .then(_ => console.log('...wait for script to exit'))
  .catch(error => console.error('seed error', error));