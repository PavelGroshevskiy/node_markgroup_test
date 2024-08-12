import express, { Request, Response, NextFunction } from "express";

var router = express.Router();
const port = 8000;
const app = express();

app.get("/user", (req: Request, res: Response) => {
    res.send("hi");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    res.status(401).send(err.message);
});

app.listen(port, () => {
    console.log(`server start on ${port}`);
});
