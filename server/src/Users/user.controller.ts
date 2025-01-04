import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseInterceptors,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.entity';
import { CheckEmailUniqueInterceptor } from './interceptors/check-email-unique.interceptor';
import { JwtAuthGuard } from '@/Auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/Auth/decorators/current-user.decarator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @UseInterceptors(CheckEmailUniqueInterceptor)
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
