import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SessionActivityMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.session?.userId) {
            req.session.lastActiveAt = new Date().toISOString();
        }
        next();
    }
}
