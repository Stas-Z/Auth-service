import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@/Users/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PasswordHasherService } from '@/utils/password-hasher.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [UsersModule, PassportModule, JwtModule],
    controllers: [AuthController],
    providers: [AuthService, PasswordHasherService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
