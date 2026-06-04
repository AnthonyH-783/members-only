import { ValidationChain } from "express-validator";
import { passwordValid, matchPasswordValid, firstNameValid, lastNameValid, emailValid,
     isAlreadyRegistered, passcodeVerification } from "./user.validation.js";

export const registerValidation = [
    firstNameValid(),
    lastNameValid(),
    emailValid(),
    passwordValid(),
    matchPasswordValid(),
    isAlreadyRegistered(),
   
]

export const verifyPasscode = passcodeVerification();

// Login handled by passport js