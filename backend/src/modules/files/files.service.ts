import { BadRequestException, Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import type { Request, Response } from 'express';
import { ensureDir, writeFile } from 'fs-extra';
import { S3Service } from 'src/core/s3/s3.service';

@Injectable()
export class FilesService {
    constructor(private readonly storage: S3Service) {}

    async saveFile(file: Express.Multer.File, folder: string) {
        const uploadedFolder = `${path}/uploads/${folder}`;

        await ensureDir(uploadedFolder);

        const fileName = `${Date.now()}-${file.originalname}`;

        await writeFile(`${uploadedFolder}/${fileName}`, file.buffer);

        return {
            url: `/uploads/${folder}/${fileName}`,
            name: fileName,
        };
    }

    async saveFiles(files: Express.Multer.File[], folder: string) {
        return Promise.all(files.map((file) => this.saveFile(file, folder)));
    }

    async upload(file: Express.Multer.File) {
        const uploaded = await this.storage.upload(file);
        return uploaded;
    }

    async delete(file: string) {
        await this.storage.delete(file);
        return true;
    }
}
