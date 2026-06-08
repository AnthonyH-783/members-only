import * as db from "../db/queries";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/error.middleware";
import { validationResult, matchedData } from "express-validator";
import formatPosts from "./formatters/postFormatter";
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

export const getPosts = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {tab} = req.query;
        const activeTab = (typeof tab === 'string') ? tab : null;
        const posts = await db.getPosts(activeTab);
       formatPosts(posts);
       console.log(posts);
        res.render("index", {posts, currentPage: "board", activeTab});
    }
    catch(error){
        const err = new AppError(500, "Problem arose when retrieve message board");
        next(err);
    }
 
    
} 

export const createPost = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {title, message} = req.body;
        const authorId = res.locals.currentUser.id;
        await db.addPost({authorId, title, message});
        res.redirect("/messages");
    }
    catch(error){
        const err =new AppError(500, "Problem arose when creating new post");
        next(err);
    }
}