import { passwordValid, matchPasswordValid, firstNameValid, lastNameValid, emailValid } from "./user.validation.js";

export const registerValidation = [
    firstNameValid(),
    lastNameValid(),
    emailValid(),
    passwordValid(),
    matchPasswordValid()
]

// Login handled by passport js