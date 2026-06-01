import {Pool} from "pg";

export default new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT),
    password: process.env.PGPASSWORD
})