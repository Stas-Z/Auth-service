import { IsString, IsEmail, MinLength, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    readonly email: string;

    @MinLength(8, { message: 'Пароль должен содержать не менее 8 символов.' })
    @Matches(/[A-Z]/, {
        message: 'Пароль должен содержать хотя бы одну заглавную букву.',
    })
    @Matches(/[0-9]/, {
        message: 'Пароль должен содержать хотя бы одну цифру.',
    })
    @Matches(/[@$!%*?&]/, {
        message: 'Пароль должен содержать хотя бы один специальный символ.',
    })
    @IsString()
    readonly password: string;
}
