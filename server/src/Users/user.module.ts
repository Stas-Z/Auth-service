import { CaptchaModule } from '@/Captcha/captcha.module';
import { CaptchaService } from '@/Captcha/captcha.service';
import { DataHasherService } from '@/utils/data-hasher.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './schema/user.entity';
import { UsersController } from './user.controller';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]), CaptchaModule, JwtModule],
    providers: [UsersService, DataHasherService, CaptchaService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
