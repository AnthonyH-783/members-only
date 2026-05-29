const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../db/queries");
const bcrypt = require("bcrypt");

// Defining verification callback 
const verifyCallback = async(username, password, done) => {
    try{
        const user = await db.getUserByUsername(username);
        if(!user){
            return done(null, false, {message: "No user with given username was found"});
        }
        const hashedPassword = user.password;
        const match = bcrypt.compare(password, hashedPassword);
        if(!match){
            return done(null, false, {message: "Password does not match username"});
        }
        return done(null, user);
    }
    catch(err){
        return done(err);
    }
}
// Definining local Strategy
const strategy = new LocalStrategy(verifyCallback);

// Applying Strategy to passport
passport.use(strategy);

// Defining serializing and deserializing functions
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await db.getUserById(id);
        return done(null, user);
    }
    catch(err){
        return done(err);
    }

});




module.exports = passport;