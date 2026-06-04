import bcrypt from "bcrypt";
import * as db from "../db/queries.js";
import {Request, Response} from "express";
import { role } from "../types.js";
import { validationResult, matchedData } from "express-validator";

export const saveUser = async(req: Request, res: Response) => {
        // Validating request fields
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render("pages/sign-up", {
                errors: errors.array()
            })
        }
        const {firstName, lastName, email, password} = matchedData(req);
        try{
            const passwordHash = await bcrypt.hash(password, 10);
            const role: role = "guest";
            await db.addUser({firstName, lastName, email, passwordHash, role});
            res.redirect("/log-in");
        }
        catch(err){
            res.status(500).json(err);
        }
}
