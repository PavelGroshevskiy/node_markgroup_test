import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Not correct email' })
	email: string;
	@IsString({ message: 'Only string format' })
	password: string;
}
