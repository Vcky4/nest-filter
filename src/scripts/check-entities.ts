import { DataSource } from 'typeorm';
import { configService } from 'src/config/config.service';

const dataSource = new DataSource(configService.getTypeOrmConfig());

async function checkEntities() {
  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');

    const entities = dataSource.entityMetadatas;
    if (entities.length === 0) {
      console.log('No entities found in the database.');
    } else {
      console.log('Entities found in the database:');
      entities.forEach(entity => {
        console.log(`- ${entity.name}`);
      });
    }

    await dataSource.destroy();
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
  }
}

checkEntities();
