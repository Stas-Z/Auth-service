import {
    Controller,
    Post,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CheckEmailExistInterceptor } from './interceptors/check-email-exist.interceptor';
import { CurrentUser } from './decorators/current-user.decarator';
import { User } from '@/Users/schema/user.entity';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseInterceptors(CheckEmailExistInterceptor)
    @UseGuards(LocalAuthGuard)
    async login(
        @CurrentUser() user: User,
        @Res({ passthrough: true }) response: Response,
    ) {
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
}
