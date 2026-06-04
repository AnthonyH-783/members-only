import {body} from "express-validator";
import * as db from "../../db/queries.js";
import { PASSCODE } from "../../config/env.js";

export const passwordValid = () => {
    const emptyErr = "Password is required";
    const alphaNumErr = "Password must contain letters and digits";
    const lengthErr = "Password must be at least 10 characters";
    const comboErr = "Password must contain uppercase, lowercase, number and symbol";
    return (
        body("password").notEmpty().withMessage(`${emptyErr}`)
        .isLength({min: 10}).withMessage(`${lengthErr}`)
        .isStrongPassword({
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage(`${comboErr}`)
    )
}
export const matchPasswordValid = () => {
    return(
    body("password").custom((value: string, {req}) => {
        return value === req.body.confirmPassword;
    }));
}

export const emailValid = () => {
    return(
        body("email").notEmpty().trim().isEmail()
    )
}

export const firstNameValid = () => {
    const emptyErr = `First name is required`;
    const alphaNumErr = `Name can only contain alpabetical characters`;
    const lengthErr = `Name cannot contain more than 20 characters`
    return(
        body("firstName").trim().notEmpty().withMessage(`${emptyErr}`)
        .isAlpha().withMessage(`${alphaNumErr}`)
        .isLength({max: 20}).withMessage(`${lengthErr}`)
    )
}

export const lastNameValid = () => {
    const emptyErr = `First name is required`;
    const alphaNumErr = `Name can only contain alpabetical characters`;
    const lengthErr = `Name cannot contain more than 20 characters`
    return(
        body("lastName").trim().notEmpty().withMessage(`${emptyErr}`)
        .isAlpha().withMessage(`${alphaNumErr}`)
        .isLength({max: 20}).withMessage(`${lengthErr}`)
    )
}

export const isAlreadyRegistered = () => {
    return(
        body("email").custom( async (value) => {
            const existingUser = await db.getUserByEmail(value);
            if(existingUser){
                throw new Error("User with given email already exists");
            }
        })
    )
}

export const passcodeVerification = () => {
    return (
        body("password").custom((value) => {
            if(PASSCODE && value !== PASSCODE){
                throw new Error("Wrong passcode");
            }
        })
    )
}

