import { ConfigService } from '@nestjs/config';
import session from 'express-session';
import { RedisService } from '../redis/redis.service';
import RedisStore from 'connect-redis';
import { ms, StringValue } from '@/shared/utils/ms.util';
import { parseBoolean } from '@/shared/utils/parse-boolean.util';

export function sessionConfig(config: ConfigService, redis: RedisService) {
    return session({
        secret: config.getOrThrow<string>('SESSION_SECRET'),
        name: config.getOrThrow<string>('SESSION_NAME'),
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
            httpOnly: parseBoolean(
                config.getOrThrow<string>('SESSION_HTTP_ONLY'),
            ),
            secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')),
            sameSite: 'lax',
        },
        store: new RedisStore({
            client: redis,
            prefix: config.getOrThrow<string>('SESSION_FOLDER'),
        }),
    });
}
