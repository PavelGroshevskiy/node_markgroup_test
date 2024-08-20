import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExeptionFilter, IExeptionFilter } from './errors/exception.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './user/user.controller';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IUserController } from './user/userController.interface';
import { IUserService, UserService } from './user/user.service';
import { IConfigService } from './config/config-service.interface';
import { ConfigService } from './config/config.service';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IUserController>(TYPES.UserController).to(UserController);

	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IExeptionFilter>(TYPES.ExeptionFilter)
		.to(ExeptionFilter)
		.inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService)
		.to(ConfigService)
		.inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

export interface IBootstrap {
	appContainer: Container;
	app: App;
}

const bootstrap = (): IBootstrap => {
	const appContainer = new Container();

	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
};

export const { app, appContainer } = bootstrap();
