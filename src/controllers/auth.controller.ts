import {Request, Response, NextFunction} from "express";
import passport from "passport";


export const handleLogin = passport.authenticate("local",  {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true
    
});

export const handleLogout = (req: Request, res: Response, next: NextFunction) => {
    req.logout(err => {
        if(err){
            return next(err);
        }
        res.redirect("/");
    })
}