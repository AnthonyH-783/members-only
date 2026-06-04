import express from "express";
import { Request, Response, NextFunction } from "express";
import { restrictToRole, restrictToUnauth, requireAuth } from "../middlewares/auth.middleware";


const pageRouter = express.Router();


const formRenderer = (page: string) => {
    return (req: Request, res: Response) => {
        const {error, errors} = req.query;
        const path = `pages/${page}`;
        res.render(path, {error, errors});
    }
}

pageRouter.get("/", (req, res) => res.render("index"));

pageRouter.get("/join", restrictToRole("guest"), formRenderer("join"));

pageRouter.get("/log-in", restrictToUnauth, formRenderer("log-in"));

pageRouter.get("/sign-up", restrictToUnauth, formRenderer("sign-up"));

pageRouter.get("/posts/new", requireAuth, formRenderer("newPost"));





export default pageRouter;