import session, { SessionOptions } from "express-session";
import PostgresAdapter from "connect-pg-simple";
import pool from "../db/pool"


const PGStore = PostgresAdapter(session);
// Instantiating postgres store object
const pgStore = new PGStore({
    pool,
    tableName: "user_sessions"
});

// Creating Session Configuration Object
const secret = process.env.COOKIE_SECRET;
if (!secret) {
    throw new Error("COOKIE_SECRET environment variable is not set");
}
const config: SessionOptions = {
    store: pgStore,
    secret, // for cookie signature encryption
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}

const configuredSession = session(config);

export default configuredSession;