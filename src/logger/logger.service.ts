import 'reflect-metadata';
import { injectable } from 'inversify';
import { Logger, ILogObj } from 'tslog';

@injectable()
export class LoggerService {
	logger: Logger<ILogObj>;
	constructor() {
		this.logger = new Logger({});
	}

	info(...args: unknown[]): void {
		this.logger.info(...args);
	}
	error(...args: unknown[]): void {
		this.logger.error(...args);
	}
	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
