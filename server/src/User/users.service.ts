import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './schema/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordHasherService } from '@/utils/password-hasher.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly passwordHasher: PasswordHasherService,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { password, email } = createUserDto;
        const hashedPassword = await this.passwordHasher.hashPassword(password);

        const newUser = this.usersRepository.create({
            email,
            password: hashedPassword,
        });
        return await this.usersRepository.save(newUser);
    }

    async login(authLoginDto: AuthLoginDto): Promise<User | null> {
        const { password, email } = authLoginDto;
        const user = await this.usersRepository.findOneBy({ email });

        const isPasswordValid = await this.passwordHasher.comparePasswords(
            password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Неверный пароль.');
        }

        if (user) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async findAll(): Promise<User[]> {
        const users = await this.usersRepository.find();
        return users;
    }

    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOne({
            where: { email: email.toLowerCase() },
        });
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
