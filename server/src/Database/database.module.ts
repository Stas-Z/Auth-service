import { IConfig } from '@/config/configuration';
import { User } from '@/Users/schema/user.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService<IConfig>) => {
                const database =
                    configService.get<IConfig['database']>('database');
                return {
                    type: 'mysql',
                    host: database.host,
                    port: database.port,
                    username: database.user,
                    password: database.password,
                    database: 'user_schema',
                    entities: [User],
                    synchronize: true,
                };
            },
        }),
    ],
})
export class DatabaseModule {}
