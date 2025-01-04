import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class CheckEmailUniqueInterceptor implements NestInterceptor {
    constructor(private readonly usersService: UsersService) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        try {
            const { email } = request.body;

            const existingUser = await this.usersService.findByEmail(
                email.toLowerCase(),
            );
            if (existingUser) {
                throw new BadRequestException('Такой email уже существует.');
            }

            return next.handle();
        } catch (e) {
            throw new UnauthorizedException('Вы не ввывели емайл!');
        }
    }
}
