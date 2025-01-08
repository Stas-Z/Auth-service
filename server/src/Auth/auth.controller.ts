import { User } from '@/Users/schema/user.entity';
import {
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

    @Post()
    @UseGuards(JwtAuthGuard)
    async authorization(@Res({ passthrough: true }) response: Response) {
        await this.authService.authorization(response);
    }
}
