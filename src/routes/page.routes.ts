import express from "express";
import { Request, Response, NextFunction } from "express";
import { restrictToRole, restrictToUnauth, requireAuth, requireOwnerOrAdmin } from "../middlewares/auth.middleware";
import * as postsController from "../controllers/post.controller";

const pageRouter = express.Router();


const formRenderer = (page: string) => {
    return (req: Request, res: Response) => {
        const {error, errors} = req.query;
        const path = `pages/${page}`;
        res.render(path, {error, errors});
    }
}

pageRouter.get("/", (req, res) => res.redirect("/messages"));

pageRouter.get("/messages", postsController.getPosts);

pageRouter.get("/join", restrictToRole("guest"), formRenderer("join"));

pageRouter.get("/log-in", restrictToUnauth, formRenderer("log-in"));

pageRouter.get("/sign-up", restrictToUnauth, formRenderer("sign-up"));

pageRouter.get("/posts/new", requireAuth, formRenderer("new-post"));

pageRouter.get("/posts/:postId/delete", requireOwnerOrAdmin, postsController.getPostDeleteForm);





export default pageRouter;