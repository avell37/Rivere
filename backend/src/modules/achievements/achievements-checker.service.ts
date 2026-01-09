import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class AchievementsCheckerService {
    constructor(private readonly prisma: PrismaService) {}
}
