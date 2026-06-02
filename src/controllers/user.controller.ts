import bcrypt from "bcrypt";
import * as db from "../db/queries.js";
import {Request, Response} from "express";
import { role } from "../types.js";


export const saveUser = async(req: Request, res: Response) => {

    const {firstName, lastName, email, password, confirmPassword} = req.body;
    if(password !== confirmPassword){
        const queryString = new URLSearchParams();
        queryString.append("error", "Passwords have to match")
        return res.redirect(`/sign-up?${queryString}`);
    }
    try{
        const passwordHash = await bcrypt.hash(password, 10);
        const role: role = "member";
        await db.addUser({firstName, lastName, email, passwordHash, role});
        res.redirect("/log-in");
    }
    catch(err){
        res.status(500).json(err);
    }
}