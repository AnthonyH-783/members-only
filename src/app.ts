import express from "express";
import "./config/env.js";
import passport from "./authentication/passport.js";
import {PORT} from "./config/env.js";
import configuredSession from "./authentication/session.js";
import path from "node:path";
import bindUser from "./middlewares/auth.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
import pageRouter from "./routes/page.routes.js";
import formRouter from "./routes/form.routes.js";
import { fileURLToPath } from "node:url";


const app = express();


// Setting views
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Setting up middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));
app.use(configuredSession);
app.use(passport.session());
app.use(bindUser);


// Setting up routers
console.log("I reached this point");
app.use("/", pageRouter);
app.use("/forms", formRouter);


// Error middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})