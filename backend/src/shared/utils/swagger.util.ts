import { SwaggerConfig } from '@/core/config/swagger.config';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, SwaggerConfig());

    SwaggerModule.setup('/docs', app, document, {
        customSiteTitle: 'Rivere API',
    });
}
