import * as db from "../db/queries";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/error.middleware";
import { validationResult, matchedData } from "express-validator";

export const savePost = async (req: Request, res: Response, next: NextFunction) => {

    try{
        // Checking for user
        const userId = res.locals.currentUser?.id;
        if(!userId){
            return next(new AppError(403, "Not author found for current post"));
        }
        // Validating submitted data
        const {title, message} = matchedData(req);

        await db.addPost({authorId: userId, title, message});
        res.redirect("/");

    }
    catch(err){
        const error = new AppError(500, "Couldn't add post to database");
        return next(error);
    }

}

export const deletePost = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {postId} = req.params;
        await db.deletePost(Number(postId));
        res.redirect("/");
        
    } catch (error) {
        const err = new AppError(500, "Problem arose when deleting post");
        next(err);  
    }
}