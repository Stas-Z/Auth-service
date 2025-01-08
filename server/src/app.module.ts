import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Auth/auth.module';
import { CaptchaModule } from './Captcha/captcha.module';
import configuration from './config/configuration';
import { DatabaseModule } from './Database/database.module';
import { UsersModule } from './Users/user.module';

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
        CaptchaModule,
    ],
})
export class AppModule {}
