import express from "express";

var userRouter = express.Router();

userRouter.get("/login", () => {
    console.log("login");
});
