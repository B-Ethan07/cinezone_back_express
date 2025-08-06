import database from "../Config/database.js";


// --------------- CATEGORY -----------------
export const category = (req, res) => {

    database.query("select * from categories").then(([categories]) => {
        res.json([categories]);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
};
export const moviesByCategory = (req, res) => {
    const categoryId = parseInt(req.params.id);
    /*const movies = req.query.movies;*/

    database.query("SELECT * FROM categories LEFT JOIN movies ON movies.category_id = categories.id WHERE categories.id = ?", [categoryId])
        .then(([results]) => {
            if (results.length > 0) {
                res.json(results);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};