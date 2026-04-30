import { Injectable } from '@nestjs/common';
import { S3Service } from 'src/core/s3/s3.service';

@Injectable()
export class FilesService {
    constructor(private readonly storage: S3Service) {}

    async upload(file: Express.Multer.File) {
        const uploaded = await this.storage.upload(file);
        return uploaded;
    }

    async delete(file: string) {
        await this.storage.delete(file);
        return true;
    }
}
