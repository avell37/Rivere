import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { ValidationPipe } from '@nestjs/common';
import { RedisService } from './core/redis/redis.service';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './shared/utils/swagger.util';
import { sessionConfig } from './core/config/session.config';

async function bootstrap() {
    const app = await NestFactory.create(CoreModule);
    const config = app.get(ConfigService);
    const redis = app.get(RedisService);

    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    app.use(sessionConfig(config, redis));

    app.enableCors({
        origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
        credentials: true,
        exposedHeaders: ['set-cookie'],
    });

    setupSwagger(app);

    await app.listen(config.getOrThrow<number>('PORT'));
}
bootstrap();
