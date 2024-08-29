import { inject, injectable } from 'inversify';
import { compare } from 'bcryptjs';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { TYPES } from '../types';
import { IConfigService } from '../config/config-service.interface';
import { IUsersRepository } from './user-repository.interface';
import { UserModel } from '@prisma/client';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
}

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private userRepository: IUsersRepository,
	) {}

	async createUser({
		email,
		name,
		password,
	}: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existingUser = await this.userRepository.find(email);
		if (existingUser) return null;
		return await this.userRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existingUser = await this.userRepository.find(email);
		if (!existingUser) return false;
		const newUser = new User(
			existingUser.email,
			existingUser.name,
			existingUser.password,
		);

		return await newUser.comparePassword(password);
	}
}
