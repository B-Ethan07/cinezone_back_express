import { Router } from 'express';
import { userValidator } from '../middleware/userValidator.js';
import { createUser }  from '../Controller/UsersController.js';
import { checkEMailNotTaken, hashPassword } from '../middleware/authValidator.js';

const router = Router();

// POST
router.post("/", userValidator, checkEMailNotTaken, hashPassword, createUser);

export { router as usersRouter };
