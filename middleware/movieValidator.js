import { body } from "express-validator";
import handleValidationError from "./handleValidationError.js";

export const movieValidator = [
    body("title").notEmpty().withMessage("Movie title is required").isLength({ min: 2, max: 100}).withMessage("Movie title must be 2 to 100 characters long"),
    body("description").optional().isLength({ max: 500 }).withMessage("Movie description must be less than 500 characters long"),
    body("release_year").optional().isInt({ min: 1888, max: new Date().getFullYear() }).withMessage("Release year must be a valid year"),
    body("rating").optional().isFloat({ min: 0, max: 10 }).withMessage("Rating must be between 0 and 10"),
    body("category_id").optional().isInt().withMessage("Category ID must be a valid integer"),
    handleValidationError
]