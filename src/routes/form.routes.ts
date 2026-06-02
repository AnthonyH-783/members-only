import express from "express";
import passport from "passport";
import * as usersController from "../controllers/user.controller.js";
import * as authController from "../controllers/auth.controller.js";
import { registerValidation } from "../controllers/validators/index.validation.js";
const formRouter = express.Router();

formRouter.post("/sign-up", registerValidation, usersController.saveUser);
formRouter.post("/log-in", authController.handleLogin);
formRouter.post("/log-out", authController.handleLogout);

export default formRouter;