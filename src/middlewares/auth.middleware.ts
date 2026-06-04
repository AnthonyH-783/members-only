import {Request, Response, NextFunction} from "express";
import { role } from "../types";
import { AppError } from "./error.middleware";

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
        if(!req.user){
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
    if(res.locals.currentUser){
        return next(accessErr);
    }
    next();
}
