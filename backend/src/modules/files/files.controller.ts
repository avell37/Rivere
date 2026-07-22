import {
    BadRequestException,
    Controller,
    Delete,
    HttpCode,
    Param,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import {
    FilesService,
    isAllowedImageMime,
    MAX_FILE_SIZE_BYTES,
} from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { Authorization } from '@/shared/decorators/authorization.decorator';
import { SessionUser } from '@/shared/decorators/session-user.decorator';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @ApiOperation({
        summary: 'Публикация файлов',
        description: 'Опубликует файлы на S3 хранилище',
    })
    @Authorization()
    @HttpCode(200)
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            limits: { fileSize: MAX_FILE_SIZE_BYTES },
            fileFilter: (_req, file, cb) => {
                if (!isAllowedImageMime(file.mimetype)) {
                    return cb(
                        new BadRequestException({
                            code: 'errors.upload.invalidType',
                            message:
                                'Допустимы только изображения JPEG, PNG, GIF, WebP.',
                        }),
                        false,
                    );
                }

                cb(null, true);
            },
        }),
    )
    async upload(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException({
                code: 'errors.upload.missingFile',
                message: 'Файл не передан.',
            });
        }

        return this.filesService.upload(file);
    }

    @ApiOperation({
        summary: 'Удаление файла',
        description: 'Удаляет файл с S3 хранилища',
    })
    @Authorization()
    @HttpCode(200)
    @Delete(':file')
    async delete(
        @SessionUser('id') userId: string,
        @Param('file') file: string,
    ) {
        return this.filesService.delete(userId, file);
    }
}
