import { Module } from '@nestjs/common';
import { PasswordRecoveryService } from './password-recovery.service';
import { PasswordRecoveryController } from './password-recovery.controller';
import { TokenModule } from '../token/token.module';

@Module({
    imports: [TokenModule],
    controllers: [PasswordRecoveryController],
    providers: [PasswordRecoveryService],
})
export class PasswordRecoveryModule {}
