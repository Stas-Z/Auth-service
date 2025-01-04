import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class CheckEmailExistInterceptor implements NestInterceptor {
    constructor(private readonly usersService: UsersService) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const { email } = request.body;

        const existingUser = await this.usersService.findByEmail(
            email.toLowerCase(),
        );
        if (!existingUser) {
            throw new NotFoundException(
                'Пользователь с таким email не найден.',
            );
        }

        return next.handle();
    }
}
