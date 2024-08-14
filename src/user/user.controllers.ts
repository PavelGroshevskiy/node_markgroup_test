import { NextFunction, Response, Request } from "express";
import { BaseController } from "../controller/base.controller";
import { LoggerService } from "../logger/logger.service";
import { HTTPError } from "../errors/http-error.class";

export class UserController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
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
