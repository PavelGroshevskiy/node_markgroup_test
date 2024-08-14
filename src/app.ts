import express, { Express } from "express";

import { Server } from "http";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./user/user.controllers";
import { ExeptionFilter } from "./errors/exception.filter";

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    userController: UserController;
    exeptionFilter: ExeptionFilter;

    constructor(
        logger: LoggerService,
        userController: UserController,
        exeptionFilter: ExeptionFilter,
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exeptionFilter = exeptionFilter;
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
