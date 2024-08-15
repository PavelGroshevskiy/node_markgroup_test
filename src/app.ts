import "reflect-metadata";
import express, { Express } from "express";
import { inject, injectable } from "inversify";
import { Server } from "http";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./user/user.controllers";
import { ExeptionFilter } from "./errors/exception.filter";
import { TYPES } from "./types";

@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) private logger: LoggerService,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
    ) {
        this.app = express();
        this.port = 8000;
    }

    userRoutes() {
        this.app.use("/users", this.userController.router);
    }

    useExeptionFilters() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
    }

    public async init() {
        this.userRoutes();
        this.useExeptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.info(`Сервер запущен на ${this.port}`);
    }
}
