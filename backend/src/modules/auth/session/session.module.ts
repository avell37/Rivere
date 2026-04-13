import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TokenModule } from '../token/token.module';
import { VerificationModule } from '../verification/verification.module';

@Module({
    imports: [TokenModule, VerificationModule],
    controllers: [SessionController],
    providers: [SessionService],
})
export class SessionModule {}
