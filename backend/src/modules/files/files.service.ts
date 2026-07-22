import { S3Service } from '@/core/s3/s3.service';
import { PrismaService } from '@/core/prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';

const ALLOWED_IMAGE_MIMES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
];

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

@Injectable()
export class FilesService {
    constructor(
        private readonly storage: S3Service,
        private readonly prisma: PrismaService,
    ) {}

    async upload(file: Express.Multer.File) {
        const uploaded = await this.storage.upload(file);

        return uploaded;
    }

    async delete(userId: string, file: string) {
        await this.assertCanDelete(userId, file);
        await this.storage.delete(file);

        return {
            success: true,
            message: 'Файл успешно удален',
        };
    }

    private async assertCanDelete(userId: string, file: string) {
        const ownAvatar = await this.prisma.user.findFirst({
            where: { id: userId, avatar: file },
            select: { id: true },
        });

        if (!ownAvatar) {
            throw new ForbiddenException({
                code: 'errors.files.forbidden',
                message: 'Нет прав на удаление этого файла.',
            });
        }
    }
}

export function isAllowedImageMime(mimetype: string) {
    return ALLOWED_IMAGE_MIMES.includes(mimetype);
}
