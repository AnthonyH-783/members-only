import {Request, Response, NextFunction} from "express";
import { role } from "../types";

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
        const accessErr = new Error("Unauthorized");
        (accessErr as any).status = 401;
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
    const accessErr = new Error("Forbidden");
    (accessErr as any).status = 403;
    if(res.locals.currentUser){
        return next(accessErr);
    }
    next();
}
