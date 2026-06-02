import {Request, Response, NextFunction} from "express";

const bindUser = (req: Request, res: Response, next: NextFunction) => {
    if(req?.user){
        res.locals.currentUser = req.user;
    }
    next();
}


export default bindUser;