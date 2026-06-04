import {Request, Response, NextFunction, urlencoded} from "express";
import { role } from "../types";
import { AppError } from "./error.middleware";
import * as db from "../db/queries";
import { PostRecord } from "../types";

export const bindUser = (req: Request, res: Response, next: NextFunction) => {
    if(req.user){
        res.locals.currentUser = req.user;
    }
    else{
        res.locals.currentUser = null;
    }
    return next();
}

export const restrictToRole = (role: role) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const accessErr = new AppError(401, "Unauthorized");
        if(!req.isAuthenticated()){
            return next(accessErr); // skip if Unauthenticated
        }
        else if(res.locals.currentUser.role !== role){
            return next(accessErr);
        }
        next();
    }
}

export const restrictToUnauth = (req: Request, res: Response, next: NextFunction) =>{
    const accessErr = new AppError(403, "Forbidden");
    if(req.isAuthenticated()){
        return next(accessErr);
    }
    next();
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if(!req.isAuthenticated()){
        const query =  new URLSearchParams();
        query.append("error", "You must be logged-in to perform this action")
        return res.redirect(`/log-in?${query}`);
    }
    next();
}

export const requireOwnerOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {postId} = req.params;
        const post:PostRecord = await db.getPostById(Number(postId));
        if(res.locals.currentUser.id !== post.authorId && res.locals.currentUser.role !== "admin"){
            return next(new AppError(403, "Action requires owner or admin"));
        }
        next();
        
    } catch (error) {
        const err = new AppError(500, "Failed to retrieve post for authentication");
        next(err);
        
    }

}
