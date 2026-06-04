import { ValidationChain } from "express-validator";
import { passwordValid, matchPasswordValid, firstNameValid, lastNameValid, emailValid,
     isAlreadyRegistered, passcodeVerification } from "./user.validation.js";
import { validateNewPost } from "./post.validation.js";

export const registerValidation = [
    firstNameValid(),
    lastNameValid(),
    emailValid(),
    passwordValid(),
    matchPasswordValid(),
    isAlreadyRegistered(),
   
]

export const verifyPasscode = passcodeVerification();

export const validNewPost = validateNewPost();

// Login handled by passport js