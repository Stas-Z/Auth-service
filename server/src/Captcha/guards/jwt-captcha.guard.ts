import { IConfig } from '@/config/configuration';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CaptchaService } from '../captcha.service';

@Injectable()
export class JwtCaptchaGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<IConfig>,
        private readonly captchaService: CaptchaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.cookies?.CaptchaSession;
        const captchaInput = request.body.captchaInput;

        if (!token) {
            throw new UnauthorizedException('Токен отсутствует');
        }

        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get<string>('secret'),
            });

            if (!payload.captchaText) {
                throw new UnauthorizedException('Неверный payload капчи');
            }

            return await this.captchaService.verifyCaptcha(
                payload.captchaText,
                captchaInput,
            );
        } catch (error) {
            throw new UnauthorizedException('Неверный токен капчи');
        }
    }
}
