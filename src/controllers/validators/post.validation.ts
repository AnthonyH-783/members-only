import { body } from "express-validator"


export const validateNewPost = () => {
    return [
        body("title").trim().notEmpty().withMessage("Title is missing").
        isLength({max: 50}).withMessage("You exceed title length limit (50 chars)"),
        body("message").trim().notEmpty().withMessage("Message is missing")
        .isLength({max: 2000}).withMessage("You've exceed the message length limit (2000 chars)")
    ]
}