import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

const start = async () => {
    try {
        const app = await NestFactory.create(AppModule);

        const configService = app.get(ConfigService);
        const port = configService.get('port');
        app.enableCors({
            origin: 'http://localhost:8080',
            credentials: true,
        });
        app.use(cookieParser());
        app.useGlobalPipes(
            new ValidationPipe({
                transform: true,
                whitelist: true,
                forbidNonWhitelisted: true,
            }),
        );
        await app.listen(port, () =>
            console.log(`server started on PORT ${port}`),
        );
    } catch (e) {
        console.log(e);
    }
};

start();
