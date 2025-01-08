import { JwtCaptchaGuard } from '@/Captcha/guards/jwt-captcha.guard';
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CaptchaService } from './captcha.service';
import { CaptchaText } from './decorators/captha-text.decorator';

@Controller('captcha')
export class CaptchaController {
    constructor(private readonly captchaService: CaptchaService) {}

    @Get()
    async generateCaptcha(@Res({ passthrough: true }) response: Response) {
        await this.captchaService.generateCaptcha(response);
    }

    @Post('verify')
    @UseGuards(JwtCaptchaGuard)
    async verifyCaptcha(
        @Body('captcha')
        captcha: string,
        @CaptchaText() captchaText: string,
    ) {
        await this.captchaService.verifyCaptcha(captchaText, captcha);
    }
}
