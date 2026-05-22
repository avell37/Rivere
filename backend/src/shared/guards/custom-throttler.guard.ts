import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
    protected throwThrottlingException(): Promise<void> {
        throw new HttpException(
            {
                code: 'errors.tooManyRequests',
                message: 'Слишком много запросов. Попробуйте позже.',
            },
            HttpStatus.TOO_MANY_REQUESTS,
        );
    }
}
