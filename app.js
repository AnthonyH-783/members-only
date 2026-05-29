const express = require("express");
const passport = require("./authentication/passport");
require("dotenv").config();
const configuredSession = require("./authentication/session");
const path = require("node:path");
const indexRouter = require("./routes/index");
const usersController = require("./controllers/usersController");




const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Initializing Session
app.use(configuredSession);
app.use(passport.session());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next) => {
 res.locals.currentUser = req.user;
 next();
});

app.get("/", (req, res) => res.render("index"));

app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
}));

app.post("/signup", usersController.saveUser);

app.get("/signup", (req, res) => res.render("signup"));


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})