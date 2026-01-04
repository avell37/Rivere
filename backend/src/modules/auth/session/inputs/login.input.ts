import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginInput {
    @IsNotEmpty({ message: 'errors.auth.login.required' })
    @IsString({ message: 'errors.auth.login.isString' })
    login: string;

    @IsNotEmpty({ message: 'errors.auth.password.required' })
    @IsString({ message: 'errors.auth.password.isString' })
    @MinLength(6, { message: 'errors.auth.password.min' })
    @MaxLength(64, { message: 'errors.auth.password.max' })
    password: string;
}
