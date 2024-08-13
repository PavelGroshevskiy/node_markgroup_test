import express from "express";

export const userRouter = express.Router();

userRouter.get("/login", () => {
    console.log("login");
});
