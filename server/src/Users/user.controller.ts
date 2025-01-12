import { CurrentUser } from '@/Auth/decorators/current-user.decarator';
import { JwtAuthGuard } from '@/Auth/guards/jwt-auth.guard';
import { JwtCaptchaGuard } from '@/Captcha/guards/jwt-captcha.guard';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckEmailUniqueInterceptor } from './interceptors/check-email-unique.interceptor';
import { User } from './schema/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @UseInterceptors(CheckEmailUniqueInterceptor)
    @UseGuards(JwtCaptchaGuard)
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(@CurrentUser() user: User): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<User | null> {
        return this.usersService.findById(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.usersService.remove(id);
    }
}
