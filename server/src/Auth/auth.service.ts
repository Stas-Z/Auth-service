import { IConfig } from '@/config/configuration';
import { User } from '@/Users/schema/user.entity';
import { UsersService } from '@/Users/users.service';
import { DataHasherService } from '@/utils/data-hasher.service';
import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from './types/token-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly passwordHasher: DataHasherService,
        private readonly configService: ConfigService<IConfig>,
        private readonly jwtService: JwtService,
    ) {}

    async login(user: User, response: Response) {
        const expiresAccessToken = new Date(
            Date.now() + parseInt(this.configService.get<string>('exptime')),
        );
        const expiresRefreshToken = new Date(
            Date.now() + parseInt(this.configService.get<string>('exprefresh')),
        );

        const tokenPayload: TokenPayload = {
            userId: user.id.toString(),
        };
        const accesToken = this.jwtService.sign(tokenPayload, {
            secret: this.configService.get('secret'),
            expiresIn: `${this.configService.get<string>('exptime')}ms`,
        });
        const refreshToken = this.jwtService.sign(tokenPayload, {
            secret: this.configService.get('refresh'),
            expiresIn: `${this.configService.get<string>('exprefresh')}ms`,
        });

        await this.usersService.updateUser(
            { id: user.id },
            { refreshToken: await this.passwordHasher.hashData(refreshToken) },
        );

        response.cookie('Authentication', accesToken, {
            httpOnly: true,
            secure: this.configService.get('NODE_ENV') === 'production',
            expires: expiresAccessToken,
        });
        response.cookie('Refresh', refreshToken, {
            httpOnly: true,
            secure: this.configService.get('NODE_ENV') === 'production',
            expires: expiresRefreshToken,
        });

        return response.json({
            id: user.id,
            email: user.email,
        });
    }

    async verifyUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new NotFoundException(
                'Пользователь с таким email не найден.',
            );
        }

        const isPasswordValid = await this.passwordHasher.compareData(
            password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Неверный пароль.');
        }
        return user;
    }

    async verifyUserRefreshToken(refreshToken: string, userId: number) {
        try {
            const user = await this.usersService.findById(userId);
            const authenticated = await this.passwordHasher.compareData(
                refreshToken,
                user.refreshToken,
            );

            if (!authenticated) {
                throw new UnauthorizedException('Вы не авторизированны');
            }

            return user;
        } catch (e) {
            throw new UnauthorizedException('Refresh токен не валидный');
        }
    }
}
