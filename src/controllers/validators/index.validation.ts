import { passwordValid, matchPasswordValid, firstNameValid, lastNameValid, emailValid, isAlreadyRegistered } from "./user.validation.js";

export const registerValidation = [
    firstNameValid(),
    lastNameValid(),
    emailValid(),
    passwordValid(),
    matchPasswordValid(),
    isAlreadyRegistered()
    
]

// Login handled by passport js