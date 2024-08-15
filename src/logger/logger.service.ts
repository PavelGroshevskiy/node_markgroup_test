import "reflect-metadata";
import { injectable } from "inversify";
import { Logger, ILogObj } from "tslog";

@injectable()
export class LoggerService {
    logger: Logger<ILogObj>;
    constructor() {
        this.logger = new Logger({});
    }

    info(...args: unknown[]) {
        this.logger.info(...args);
    }
    error(...args: unknown[]) {
        this.logger.error(...args);
    }
    warn(...args: unknown[]) {
        this.logger.warn(...args);
    }
}
