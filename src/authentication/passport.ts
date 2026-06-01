import passport from 'passport';
import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local';
import * as db from "../db/queries";
import bcrypt from "bcrypt";
import { localLogin, verifyDone } from '../types';

const customFields: localLogin = {
    usernameField:"email",
    passwordField: "password"
}

declare global {
  namespace Express {
    interface User {
      id: number
    }
  }
}


const verifyCallback = async(email: string, password: string, done: verifyDone) => {

    try{
        const errorMessage = "Invalid email or password";
        const user = await db.getUserByEmail(email);
        if(!user){
            return done(null, false, {message: errorMessage});
        }
        const match = await bcrypt.compare(password, user.password_hash);
        if(!match){
            return done(null, false, {message: errorMessage});
        }
        return done(null, user);
    }
    catch(err){
        return done(err);
        
    }
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

// Defining serializing and deserializing functions
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
    try{
        const user = await db.getUserById(id);
        return done(null, user);
    }
    catch(err){
        return done(err);
    }

});

export default passport;
