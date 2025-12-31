import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FilesService {
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
}
