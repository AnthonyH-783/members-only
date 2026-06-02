import express from "express";
import passport from "passport";
import * as usersController from "../controllers/user.controller.js";
import * as authController from "../controllers/auth.controller.js";
const formRouter = express.Router();

formRouter.post("/sign-up", usersController.saveUser);
formRouter.post("/log-in", authController.handleLogin);
formRouter.post("/log-out", authController.handleLogout);

export default formRouter;