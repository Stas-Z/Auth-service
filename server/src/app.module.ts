import { Module } from '@nestjs/common';
import { UsersModule } from './Users/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './Database/database.module';
import { AuthModule } from './Auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.development.env',
            load: [configuration],
            isGlobal: true,
        }),
        DatabaseModule,
        UsersModule,
        AuthModule,
    ],
})
export class AppModule {}
