import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtCaptchaGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();

        const token = request.cookies?.CaptchaSession;
        if (!token) {
            throw new UnauthorizedException('Токен отсутствует');
        }

        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get<string>('secret'),
            });

            request['captchaText'] = payload.captchaText;

            if (!payload.captchaText) {
                throw new UnauthorizedException('Неверный payload капчи');
            }
            return true;
        } catch (error) {
            throw new UnauthorizedException('Неверный токен капчи');
        }
    }
}
