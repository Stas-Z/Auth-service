import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './schema/user.entity';
import { UsersController } from './user.controller';
import { PasswordHasherService } from '@/utils/password-hasher.service';
import { DatabaseModule } from '@/Database/database.module';

@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([User])],
    providers: [UsersService, PasswordHasherService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
