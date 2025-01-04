import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../types/token-payload.interface';
import { UsersService } from '@/Users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies?.Authentication,
            ]),
            secretOrKey: configService.get('secret'),
        });
    }

    async validate(payload: TokenPayload) {
        return this.usersService.findById(Number(payload.userId));
    }
}
