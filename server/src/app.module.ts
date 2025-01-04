import { Module } from '@nestjs/common';
import { UsersModule } from './User/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.development.env',
            load: [configuration],
            isGlobal: true,
        }),
        UsersModule,
    ],
})
export class AppModule {}
