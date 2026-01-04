import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangeNicknameInput {
    @IsNotEmpty({ message: 'errors.account.nickname.required' })
    @IsString({ message: 'errors.account.nickname.isString' })
    @MinLength(4, {
        message: 'errors.account.nickname.min',
    })
    @MaxLength(32, {
        message: 'errors.account.nickname.max',
    })
    nickname: string;
}
