export type role = "guest" | "member" | "admin";

export interface user{
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    role: role
}

export interface newUser{
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    role: role
}

export interface newPost{
    authorId: string,
    title: string,
    message: string
}

export interface localLogin{
    usernameField: string,
    passwordField: string
}

export interface verifyDone{
    (error: any, user?: Express.User | false, options?: {message: string}): void

}

export interface UserRecord {
    id: number;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}

