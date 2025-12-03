import { DocumentBuilder } from '@nestjs/swagger';

export function SwaggerConfig() {
    return new DocumentBuilder()
        .setTitle('Rivere API')
        .setDescription('A small documentation of API methods on Rivere')
        .setVersion('1.0')
        .build();
}
