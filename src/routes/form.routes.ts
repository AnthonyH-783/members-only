import express from "express";
import passport from "passport";
import * as usersController from "../controllers/user.controller.js";
const formRouter = express.Router();

formRouter.post("/sign-up", usersController.saveUser);
formRouter.post("/log-in", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/"
}));

export default formRouter;