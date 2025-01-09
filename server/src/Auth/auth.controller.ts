import { CaptchaService } from '@/Captcha/captcha.service';
import { CaptchaText } from '@/Captcha/decorators/captha-text.decorator';
import { JwtCaptchaGuard } from '@/Captcha/guards/jwt-captcha.guard';
import { User } from '@/Users/schema/user.entity';
import {
    Body,
    Controller,
    Post,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decarator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CheckEmailExistInterceptor } from './interceptors/check-email-exist.interceptor';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly captchaService: CaptchaService,
    ) {}
    @Post('login')
    @UseInterceptors(CheckEmailExistInterceptor)
    @UseGuards(LocalAuthGuard)
    @UseGuards(JwtCaptchaGuard)
    async login(
        @Body('captchaInput') captcha: string,
        @CaptchaText() captchaText: string,
        @CurrentUser() user: User,
        @Res({ passthrough: true }) response: Response,
    ) {
        await this.captchaService.verifyCaptcha(captchaText, captcha);
        await this.authService.login(user, response);
    }

    @Post('refresh')
    @UseGuards(JwtRefreshAuthGuard)
    async refreshToken(
        @CurrentUser() user: User,
        @Res({ passthrough: true }) response: Response,
    ) {
        await this.authService.login(user, response);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async authorization(@Res({ passthrough: true }) response: Response) {
        await this.authService.authorization(response);
    }
}
