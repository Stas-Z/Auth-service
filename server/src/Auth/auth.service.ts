import { UsersService } from '@/Users/users.service';
import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { PasswordHasherService } from '@/utils/password-hasher.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/Users/schema/user.entity';
import { TokenPayload } from './types/token-payload.interface';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly passwordHasher: PasswordHasherService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    async login(user: User, response: Response) {
        const expiresAccessToken = new Date(
            Date.now() + parseInt(this.configService.get<string>('exptime')),
        );

        const tokenPayload: TokenPayload = {
            userId: user.id.toString(),
        };
        const accesToken = this.jwtService.sign(tokenPayload, {
            secret: this.configService.get('secret'),
            expiresIn: `${this.configService.get<string>('exptime')}ms`,
        });
        response.cookie('Authentication', accesToken, {
            httpOnly: true,
            secure: this.configService.get('NODE_ENV') === 'production',
            expires: expiresAccessToken,
        });
    }

    async verifyUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new NotFoundException(
                'Пользователь с таким email не найден.',
            );
        }

        const isPasswordValid = await this.passwordHasher.comparePasswords(
            password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Неверный пароль.');
        }
        return user;
    }
}
