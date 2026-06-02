import express from "express";
import { getSystemErrorMessage } from "node:util";
import passport from "passport";


const pageRouter = express.Router();

pageRouter.get("/", (req, res) => res.render("index"));

pageRouter.get("/log-in", (req, res) => {
    const {error} = req.query;
    return res.render("pages/log-in", {error})
} );

pageRouter.get("/sign-up", (req, res) => res.render("pages/sign-up", {errors: []}));


export default pageRouter;