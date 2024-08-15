import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExeptionFilter, IExeptionFilter } from './errors/exception.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './user/user.controllers';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<UserController>(TYPES.UserController).to(UserController);
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
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
