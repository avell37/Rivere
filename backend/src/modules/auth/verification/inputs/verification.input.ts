import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class VerificationInput {
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    public token!: string;
}
