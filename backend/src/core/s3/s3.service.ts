import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { extname } from 'node:path';
import { randomBytes } from 'node:crypto';

@Injectable()
export class S3Service {
    private readonly client: S3Client;
    private readonly bucket: string;
    private readonly logger = new Logger(S3Service.name);

    public constructor(private readonly configService: ConfigService) {
        this.client = new S3Client({
            endpoint: this.configService.getOrThrow<string>('S3_ENDPOINT'),
            credentials: {
                accessKeyId:
                    this.configService.getOrThrow<string>('S3_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.getOrThrow<string>(
                    'S3_SECRET_ACCESS_KEY',
                ),
            },
            region: this.configService.getOrThrow<string>('S3_REGION'),
        });

        this.bucket = this.configService.getOrThrow<string>('S3_BUCKET_NAME');
    }

    public async upload(file: Express.Multer.File) {
        const extension = extname(file.originalname);
        const fileName = randomBytes(16).toString('hex') + extension;

        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        try {
            await this.client.send(command);
            return fileName;
        } catch (error) {
            this.logger.error(`Failed to upload file: ${error}`);
            throw new BadRequestException({
                code: 'errors.upload.failed',
                message: 'Failed to uploading file to S3 storage',
            });
        }
    }

    public async delete(key: string) {
        const command = new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });

        try {
            return this.client.send(command);
        } catch (error) {
            this.logger.error(`Failed to delete file ${key}: ${error}`);
            throw new BadRequestException({
                code: 'errors.upload.failed',
                message: 'Failed to deleting file from S3 storage',
            });
        }
    }
}
