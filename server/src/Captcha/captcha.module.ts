import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CaptchaController } from './captcha.controller';
import { CaptchaService } from './captcha.service';

@Module({
    imports: [JwtModule],
    controllers: [CaptchaController],
    providers: [CaptchaService],
})
export class CaptchaModule {}
