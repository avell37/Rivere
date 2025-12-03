import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import { ms, type StringValue } from './shared/utils/ms.util';
import { parseBoolean } from './shared/utils/parse-boolean.util';
import { RedisService } from './core/redis/redis.service';
import RedisStore from 'connect-redis';
import cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(CoreModule);
    const config = app.get(ConfigService);
    const redis = app.get(RedisService);

    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    app.use(
        session({
            secret: config.getOrThrow<string>('SESSION_SECRET'),
            name: config.getOrThrow<string>('SESSION_NAME'),
            resave: false,
            saveUninitialized: false,
            cookie: {
                domain: config.getOrThrow<string>('SESSION_DOMAIN'),
                maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
                httpOnly: parseBoolean(
                    config.getOrThrow<string>('SESSION_HTTP_ONLY'),
                ),
                secure: parseBoolean(
                    config.getOrThrow<string>('SESSION_SECURE'),
                ),
                sameSite: 'lax',
            },
            store: new RedisStore({
                client: redis,
                prefix: config.getOrThrow<string>('SESSION_FOLDER'),
            }),
        }),
    );

    app.enableCors({
        origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
        credentials: true,
        exposedHeaders: ['set-cookie'],
    });

    await app.listen(config.getOrThrow<number>('PORT'));
}
bootstrap();
