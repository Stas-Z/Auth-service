import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './schema/user.entity';
import { UsersController } from './user.controller';
import { DataHasherService } from '@/utils/data-hasher.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, DataHasherService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
