const session = require("express-session");
const PostgresStore = require('connect-pg-simple')(session);
const pool = require("../db/pool");

// Instantiating postgres store object
const postgresStore = new PostgresStore({
    pool,
    tableName: "user_sessions"
});
// Creating Session Configuration Object
const config = {
    store: postgresStore,
    secret: process.env.COOKIE_SECRET, // for cookie signature encryption
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}

// Configuring session
const configuredSession = session(config);


module.exports = configuredSession;