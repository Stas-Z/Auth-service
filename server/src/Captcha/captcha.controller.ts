import { JwtCaptchaGuard } from '@/Captcha/guards/jwt-captcha.guard';
import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CaptchaService } from './captcha.service';

@Controller('captcha')
export class CaptchaController {
    constructor(private readonly captchaService: CaptchaService) {}

    @Get()
    async generateCaptcha(@Res({ passthrough: true }) response: Response) {
        await this.captchaService.generateCaptcha(response);
    }

    @Post('verify')
    @UseGuards(JwtCaptchaGuard)
    async verifyCaptcha(@Res() response: Response) {
        return response?.json({ success: true });
    }
}
