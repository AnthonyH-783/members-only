const express = require("express");
const passport = require("passport");
const router = express.Router();
const usersController = require("../controllers/usersController");
router.get("/", (req, res) => res.render("index"));

router.get("/log-in", (req, res) => res.render("pages/log-in"));

router.get("/sign-up", (req, res) => res.render("pages/sign-up"));
router.post("/sign-up",usersController.saveUser);
router.post("/log-in", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/"
}))

module.exports = router;