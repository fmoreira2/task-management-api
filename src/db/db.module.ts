import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: async (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get<string>('POSTGRES_HOST') ?? 'localhost',
				port: configService.get<number>('POSTGRES_PORT') ?? 5432,
				username: configService.get<string>('POSTGRES_USER'),
				password: configService.get<string>('POSTGRES_PASSWORD'),
				database: configService.get<string>('POSTGRES_DB'),
                entities: [__dirname + '/entity/**'],
                migrations: [__dirname + '/migration/*.{js,ts}'],
				autoLoadEntities: true,
				synchronize: false,
			}),
			inject: [ConfigService],
		}),
	],
})
export class DbModule {}
