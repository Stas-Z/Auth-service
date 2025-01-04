import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './schema/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordHasherService } from '@/utils/password-hasher.service';

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

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    findById(id: number): Promise<User | null> {
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
