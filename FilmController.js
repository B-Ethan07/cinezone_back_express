import database from "./database.js";


const list = (req, res) => {
    database.query("SELECT * FROM movies")
    .then(([movies])=>{
      res.json(movies)
    })
};

export const show = (req, res) => {
  const id =
    parseInt(req.params.id)

  database.query(
    "select * from movies where id=?",[id]
  ).then(([movies]) => {
    if (movies[0] != null) {
      res.json(movies[0]);
    } else {
      res.sendStatus(404);
    }
  }).catch((err) => { 
        console.error(err);
        res.sendStatus(500);
   });
};



export const insert = (req, res) => {
  const { title, director, release_year, rating, category_id } = req.body;

  database.query("INSERT INTO movies (title, director, release_year, rating, category_id) VALUES (?)", [title, director, release_year, rating, category_id])
    .then(([result]) => {
      res.status(201).json({
        message: "Ajouté",
        id: result.insertId,
        title: title,
        director: director,
        release_year: release_year,
        rating: rating,
        category_id: category_id
      });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
}


export const update = (req, res) => {
  const id = parseInt(req.params.id);

  const { title, director, release_year, rating, category_id } = req.body;
  database.query("UPDATE movies SET title = ?, director = ?, release_year = ?, rating= ?, category_id = ?  WHERE id = ?", [id, title, director, release_year, rating, category_id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.json({
          message: "Modifié"
        });
      }
    }) .catch((err) => { 
        console.error(err);
        res.sendStatus(500);
    });
};


export const remove = (req, res) => {
  const id = parseInt(req.params.id)

  database.query("DELETE FROM movies WHERE id = ?", [id])
  .then(([result]) => {
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.json({ message: `Movie #${id} supprimé` });
    }
  }) .catch((err) => { 
    console.error(err);
    res.sendStatus(500);
   });
};

export default list;