import { SwaggerConfig } from '@/core/config/swagger.config';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { isDev } from './is-dev.util';

export function setupSwagger(app: INestApplication) {
    const config = app.get(ConfigService);

    if (!isDev(config)) return;

    const document = SwaggerModule.createDocument(app, SwaggerConfig());

    SwaggerModule.setup('/docs', app, document, {
        customSiteTitle: 'Rivere API',
    });
}
