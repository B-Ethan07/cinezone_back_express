import { Router } from 'express';
import { userValidator } from '../middleware/userValidator.js';
import { createUser, login }  from '../Controller/UsersController.js';
import { checkEMailNotTaken, findUserByEmail, verifyPassword, hashPassword, validateLogin } from '../middleware/authValidator.js';

const router = Router();

// POST
router.post("/", userValidator, checkEMailNotTaken, hashPassword, createUser);

export { router as usersRouter };
