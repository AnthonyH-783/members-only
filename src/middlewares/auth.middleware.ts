import {Request, Response, NextFunction} from "express";

const bindUser = (req: Request, res: Response, next: NextFunction) => {
    if(req.user){
        res.locals.currentUser = req.user;
    }
    else{
        res.locals.currentUser = null;
    }
    next();
}


export default bindUser;