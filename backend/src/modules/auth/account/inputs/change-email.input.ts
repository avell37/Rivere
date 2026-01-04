import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ChangeEmailInput {
    @IsNotEmpty({ message: 'errors.account.email.required' })
    @IsString({ message: 'errors.account.email.isString' })
    @IsEmail()
    email: string;
}
