import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.entity';
import { AuthLoginDto } from './dto/auth-login.dto';
import { CheckEmailUniqueInterceptor } from './interceptors/check-email-unique.interceptor';
import { CheckEmailExistInterceptor } from './interceptors/check-email-exist.interceptor';

@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    @UseInterceptors(CheckEmailUniqueInterceptor)
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Post('login')
    @UseInterceptors(CheckEmailExistInterceptor)
    async login(@Body() authLoginDto: AuthLoginDto) {
        return this.usersService.login(authLoginDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User | null> {
        return this.usersService.findOne(id);
    }
    @Get()
    async findByEmail(@Body() email: string): Promise<User | null> {
        return this.usersService.findByEmail(email);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.usersService.remove(id);
    }
}
