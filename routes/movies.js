import { Router } from 'express';
import list, { insert, remove, show, update } from '../Controller/MoviesController.js';
import { validateMovie } from '../middleware/validateMovie.js';
import { movieValidator } from '../middleware/movieValidator.js';
import handleValidationError from '../middleware/handleValidationError.js';
import { requireAdminQuery } from '../middleware/requireAdminQuery.js';

const router = Router();

router.get("/", list);
router.get("/:id", show);

router.post("/", validateMovie, handleValidationError, insert);

router.put("/:id", movieValidator, handleValidationError, update);

router.delete("/:id", requireAdminQuery, remove);

export { router as moviesRouter };
