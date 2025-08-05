import express from "express";

import list, { insert, remove, show, update } from "./FilmController.js";

const app = express();

app.use(express.json());

const serverPort = 3000;

// GET /movies
// /movies?limit=2
app.get("/movies", list);

// GET /movies/:id
app.get("/movies/:id", show);

// POST
app.post("/movies", insert);

// PUT
app.put("/movies/:id", update);

// DELETE
app.delete("/movies/:id", remove);

app.get("/", (req, res) => {
  console.log("J'ai une requête : ", req);
  res.send("Hello User !!!");
});

app.listen(serverPort, () => {
  console.info(`Listening on port http://localhost:${serverPort}`);
});
