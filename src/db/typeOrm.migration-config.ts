import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import TaskEntity from './entities/task.entity';
import UserEntity from './entities/user.entity';

config();

const configService = new ConfigService();
const DataSourceOptions: DataSourceOptions = {
	type: 'postgres',
	host: configService.get('DB_HOST') ?? 'localhost',
	port: configService.get<number>('POSTGRES_PORT') ?? 5432,
	username: configService.get('POSTGRES_USER'),
	password: configService.get('POSTGRES_PASSWORD'),
	database: configService.get('POSTGRES_DB'),
	entities: [TaskEntity,UserEntity],
	migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
	synchronize: false,
};

export default new DataSource(DataSourceOptions);