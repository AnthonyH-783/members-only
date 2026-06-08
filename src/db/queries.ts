import { QueryResult } from "pg";
import pool from "./pool.js";
import {newUser, newPost, PostRecord, UserRecord} from "../types.js";

export const getUserByEmail = async (email: string): Promise<UserRecord> => {

    const query: string = "SELECT * FROM users WHERE email = $1";
    const {rows}: QueryResult<UserRecord> = await pool.query<UserRecord>(query, [email]);
    const user = rows[0];
    return user;
}

export const getUserById = async (id: number) => {
    const query: string = "SELECT * FROM users WHERE id = $1";
    const {rows}: QueryResult<UserRecord> = await pool.query<UserRecord>(query, [id]);
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
    const query:string = `INSERT INTO posts (user_id, title, message)
                          VALUES ($1, $2, $3)`;
    await pool.query(query, [authorId, title, message])
}

export const getPostById = async(postId:number): Promise<PostRecord> => {
    const query:string = `SELECT * FROM posts WHERE id = $1`;
    const {rows} =  await pool.query<PostRecord>(query, [postId]);
    const post = rows[0];
    return post;
}

export const deletePost = async(postId:number) => {
    const query = `DELETE FROM posts WHERE id = $1`;
    await pool.query(query, [postId]);
}


export const getPosts = async(role: string | null = null) => {
    let query = `  SELECT p.id, p.user_id as "userId", p.title, p.message,
                   p.created_at as "createdAt",
                   u.first_name as "firstName",
                   u.last_name as "lastName",
                   u.role
                   FROM posts p
                   INNER JOIN users u
                   ON p.user_id = u.id`;

    const params:string[] = [];
    if(role){
        query += `  WHERE u.role = $1`;
        params.push(role);
    }
   
    const {rows} = await pool.query(query, params);
     console.log(rows);
    return rows;

}