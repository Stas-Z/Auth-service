import { CaptchaModule } from '@/Captcha/captcha.module';
import { CaptchaService } from '@/Captcha/captcha.service';
import { UsersModule } from '@/Users/user.module';
import { DataHasherService } from '@/utils/data-hasher.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [UsersModule, PassportModule, JwtModule, CaptchaModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        DataHasherService,
        CaptchaService,
        LocalStrategy,
        JwtStrategy,
        JwtRefreshStrategy,
    ],
})
export class AuthModule {}
