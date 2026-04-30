import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { S3Module } from '@/core/s3/s3.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: `${path}/uploads`,
            serveRoot: '/uploads',
        }),
        S3Module,
    ],
    controllers: [FilesController],
    providers: [FilesService],
    exports: [FilesService],
})
export class FilesModule {}
