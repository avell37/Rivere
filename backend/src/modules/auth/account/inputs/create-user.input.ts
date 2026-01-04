import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserInput {
    @IsNotEmpty({ message: 'errors.account.username.required' })
    @IsString({ message: 'errors.account.username.isString' })
    @MinLength(4, {
        message: 'errors.account.username.min',
    })
    @MaxLength(32, {
        message: 'errors.account.username.max',
    })
    username: string;

    @IsNotEmpty({ message: 'errors.account.email.required' })
    @IsString({ message: 'errors.account.email.isString' })
    email: string;

    @IsNotEmpty({ message: 'errors.account.password.required' })
    @IsString({ message: 'errors.account.password.isString' })
    @MinLength(6, { message: 'errors.account.password.min' })
    @MaxLength(64, { message: 'errors.account.password.max' })
    password: string;
}
