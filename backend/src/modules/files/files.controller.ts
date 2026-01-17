import {
    Body,
    Controller,
    HttpCode,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @ApiOperation({
        summary: 'Публикация файла',
        description:
            'Опубликует файл на серверной части, в директории "uploads/.." ',
    })
    @HttpCode(200)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(
        @UploadedFile() file: Express.Multer.File,
        @Body('folder') folder: string,
    ) {
        return this.filesService.saveFile(file, folder);
    }

    @ApiOperation({
        summary: 'Публикация файлов',
        description:
            'Опубликует файлы на серверной части, в директории "uploads/.." ',
    })
    @HttpCode(200)
    @Post('uploadFiles')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(
        @UploadedFiles() files: Express.Multer.File[],
        @Body('folder') folder: string,
    ) {
        return this.filesService.saveFiles(files, folder);
    }
}
