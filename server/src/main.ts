import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './auth/guards/roles.guard';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    //app.useGlobalGuards(new AuthGuard());
    app.enableCors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
        credentials: true
    });
    await app.listen(5000);
}
bootstrap();
