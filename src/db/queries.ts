import { QueryResult } from "pg";
import pool from "./pool.js";
import {newUser, newPost} from "../types.js";

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

export const addUser = async({firstName, lastName, email, passwordHash, role} : newUser) => {
    const query = `INSERT INTO users (first_name, last_name, email, password_hash, role)
                    VALUES ($1, $2, $3, $4, $5) `;
    await pool.query(query, [firstName, lastName, email, passwordHash, role]);
}

export const updateUserToMember = async(id: number) => {
    const query:string = `UPDATE users
                          SET role = 'member'
                          WHERE id = $1`;
    await pool.query(query, [id]);

}

export const addPost = async({authorId, title, message}: newPost) => {
    const query:string = `INSERT INTO posts (authorId, title, message)
                          VALUES ($1, $2, $3)`;
    await pool.query(query, [authorId, title, message])
}