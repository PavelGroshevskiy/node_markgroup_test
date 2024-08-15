import "reflect-metadata";
import { NextFunction, Response, Request } from "express";
import { BaseController } from "../controller/base.controller";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import { IUserController } from "./userController.interface";

@injectable()
export class UserController extends BaseController implements IUserController {
    constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
        super(loggerService);
        this.bindRoutes([
            { path: "/register", method: "post", func: this.register },
            { path: "/login", method: "post", func: this.login },
        ]);
    }

    login(req: Request, res: Response, next: NextFunction) {
        this.ok(res, "login");
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, "register");
    }
}
