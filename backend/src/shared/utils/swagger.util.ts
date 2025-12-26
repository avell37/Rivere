import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from 'src/core/config/swagger.config';

export function setupSwagger(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, SwaggerConfig());

    SwaggerModule.setup('/docs', app, document, {
        customSiteTitle: 'Rivere API',
    });
}
