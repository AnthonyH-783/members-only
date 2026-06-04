import express from "express";
import { Request, Response, NextFunction } from "express";


const pageRouter = express.Router();


const formRenderer = (page: string) => {
    return (req: Request, res: Response) => {
        const {error, errors} = req.query;
        const path = `pages/${page}`;
        res.render(path, {error, errors});
    }
}

pageRouter.get("/", (req, res) => res.render("index"));

pageRouter.get("/join", formRenderer("join"));

pageRouter.get("/log-in", formRenderer("log-in"));

pageRouter.get("/sign-up", formRenderer("sign-up"));





export default pageRouter;