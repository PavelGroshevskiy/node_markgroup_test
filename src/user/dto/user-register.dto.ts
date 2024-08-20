import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Not correct email' })
	email: string;
	@IsString({ message: 'Only string format' })
	password: string;
	@IsString({ message: 'Only string format' })
	name: string;
}
