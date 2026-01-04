import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordInput {
    @IsNotEmpty({ message: 'errors.account.password.required' })
    @IsString({ message: 'errors.account.password.isString' })
    @MinLength(6, { message: 'errors.account.password.min' })
    @MaxLength(64, { message: 'errors.account.password.max' })
    currentPassword: string;

    @IsNotEmpty({ message: 'errors.account.password.required' })
    @IsString({ message: 'errors.account.password.isString' })
    @MinLength(6, { message: 'errors.account.password.min' })
    @MaxLength(64, { message: 'errors.account.password.max' })
    newPassword: string;
}
