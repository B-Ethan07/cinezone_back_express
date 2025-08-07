import express from "express";

import list, {insert, remove, show, update} from "./Controller/MoviesController.js";
import {category, moviesByCategory} from "./Controller/CategoriesController.js";
import { validateMovie } from "./middleware/validateMovie.js";
import { query } from "express-validator";
import { movieValidator } from "./middleware/movieValidator.js";
import handleValidationError from './middleware/handleValidationError.js';
import { logger } from "./middleware/logger.js";
import { requireAdminQuery } from "./middleware/requireAdminQuery.js";
import { categoriesRouter } from "./routes/categories.js";
import { moviesRouter } from "./routes/movies.js";

// Création de l'application Express
const app = express();

// Port du serveur, par défaut 3000 ou défini par la variable d'environnement SERVER_PORT
const serverPort = process.env.SERVER_PORT ?? 3000;

// ---------------MIDDLEWARE ---------------------------

// middleware express.json() pour parser le corps des requêtes en JSON
app.use(express.json());
// log method, url and date of the request
app.use(logger); 

// ---------------ROUTE INDEX ---------------------------

app.use("/movies", moviesRouter);
app.use("/categories", categoriesRouter);

// ---------------ROUTE Controller ---------------------------


app.get("/", (req, res) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  res.send("<h1>Hello User ! Welcome in API CineZone</h1>");
});


app.listen(serverPort, () => {
  console.info(`Listening on port http://localhost:${serverPort}`);
});
