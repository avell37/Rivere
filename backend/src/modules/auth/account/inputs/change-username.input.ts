import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangeUsernameInput {
    @IsNotEmpty({ message: 'errors.account.username.required' })
    @IsString({ message: 'errors.account.username.isString' })
    @MinLength(4, {
        message: 'errors.account.username.min',
    })
    @MaxLength(32, {
        message: 'errors.account.username.max',
    })
    username: string;
}
