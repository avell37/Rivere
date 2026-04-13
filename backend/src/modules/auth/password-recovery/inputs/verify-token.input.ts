import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyTokenInput {
    @IsNotEmpty()
    @IsString()
    token: string;
}
