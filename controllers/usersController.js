const bcrypt = require("bcrypt");
const db = require("../db/queries")



exports.saveUser = async(req, res) => {
    const {username, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.addUser(username, hashedPassword);
        res.redirect("/");
    }
    catch(err){
        res.status(500).json(err);
    }
}