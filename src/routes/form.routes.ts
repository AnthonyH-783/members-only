import express from "express";
import passport from "passport";
import * as usersController from "../controllers/user.controller.js";
import * as authController from "../controllers/auth.controller.js";
import { registerValidation, verifyPasscode, validNewPost } from "../controllers/validators/index.validation.js";
import { restrictToRole, restrictToUnauth, requireAuth } from "../middlewares/auth.middleware";
import * as postsController from "../controllers/post.controller.js";
const formRouter = express.Router();

formRouter.post("/sign-up", restrictToUnauth, registerValidation, usersController.saveUser);
formRouter.post("/log-in", restrictToUnauth, authController.handleLogin);
formRouter.post("/log-out", requireAuth, authController.handleLogout);
formRouter.post("/join", restrictToRole("guest"), verifyPasscode,  usersController.promoteToMember);

formRouter.post("/messages/new", requireAuth, validNewPost, postsController.savePost);

export default formRouter;