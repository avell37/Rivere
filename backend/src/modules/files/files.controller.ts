import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(
        @UploadedFile() file: Express.Multer.File,
        @Body('folder') folder: string,
    ) {
        return this.filesService.saveFile(file, folder);
    }

    @Post('uploadFiles')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(
        @UploadedFiles() files: Express.Multer.File[],
        @Body('folder') folder: string,
    ) {
        return this.filesService.saveFiles(files, folder);
    }
}
