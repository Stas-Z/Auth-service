import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const start = async () => {
    try {
        const app = await NestFactory.create(AppModule);
        const configService = app.get(ConfigService);
        const port = configService.get('PORT');
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
