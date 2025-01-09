import { TokenPayload } from '@/Auth/types/token-payload.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class CaptchaService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}
    async generateCaptcha(response: Response) {
        const captcha = svgCaptcha.create({
            size: 6,
            noise: 3,
            color: true,
            background: '#f4f4f4',
        });

        const expiresSessionToken = new Date(
            Date.now() + parseInt(this.configService.get<string>('exptime')),
        );

        const tokenPayload: TokenPayload = {
            captchaText: captcha.text,
        };

        const sessionToken = this.jwtService.sign(tokenPayload, {
            secret: this.configService.get('secret'),
            expiresIn: `${this.configService.get<string>('exptime')}ms`,
        });
        response.cookie('CaptchaSession', sessionToken, {
            httpOnly: true,
            secure: this.configService.get('NODE_ENV') === 'production',
            expires: expiresSessionToken,
        });

        response.type('svg').send(captcha.data);
        return response;
    }

    async verifyCaptcha(
        captchaText: string,
        captchaInput: string,
        response?: Response,
    ) {
        const isValid = captchaInput === captchaText;

        if (isValid) {
            return response?.json({ success: true });
        } else {
            throw new HttpException(
                'Вы не прошли капчу',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
