import 'reflect-metadata';
import express, { Express, json } from 'express';
import { inject, injectable } from 'inversify';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { UserController } from './user/user.controllers';
import { ExeptionFilter } from './errors/exception.filter';
import { TYPES } from './types';
import { UserService } from './user/useService';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	body: any;

	constructor(
		@inject(TYPES.ILogger) private logger: LoggerService,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
	) {
		this.app = express();

		this.port = 8000;
	}

	userMiddleware(): void {
		this.app.use(json());
	}

	userRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.userMiddleware();
		this.userRoutes();
		this.useExeptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.info(`Сервер запущен на ${this.port}`);
	}
}
