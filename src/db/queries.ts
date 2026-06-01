import { QueryResult } from "pg";
import pool from "./pool";
import {user} from "../types";

export const getUserByEmail = async (email: string) => {

    const query: string = "SELECT * FROM users WHERE email = $1";
    const {rows}: QueryResult<any> = await pool.query(query, [email]);
    const user = rows[0];
    return user;
}

export const getUserById = async (id: number) => {
    const query: string = "SELECT * FROM users WHERE id = $1";
    const {rows}: QueryResult<any> = await pool.query(query, [id]);
    const user = rows[0];
    return user;
}

export const addUser = async({firstName, lastName, email, passwordHash, role} : user) => {
    const query = `INSERT INTO users (first_name, last_name, email, password_hash, role)
                    VALUES ($1, $2, $3, $4, $5) `;
    await pool.query(query, [firstName, lastName, email, passwordHash, role]);
}