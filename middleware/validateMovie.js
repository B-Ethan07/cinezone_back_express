// middleware/validateMovie.js
// Middleware pour valider les données d'un film
// Ce middleware est utilisé pour vérifier que les données du film sont valides avant de les insérer dans la base de données

export function validateMovie (req, res, next) {
    // si les données pour le movie ne sont pas valides, je m'en vais
    
    if (!req.body.title || typeof req.body.title !== 'string') {
        return res.status(400).json({ error: "Title is required and must be a string." });
    } else if (!req.body.release_year || typeof req.body.release_year !== 'number' || req.body.release_year <= 1900 || req.body.release_year > new Date().getFullYear()) {
        return res.status(400).json({ error: "Release year is required, must be a number and must be between 1900 to now" });
    } else if (req.body.rating && (typeof req.body.rating !== 'number' || req.body.rating < 0 || req.body.rating > 10)) {
        return res.status(400).json({ error: "Rating must be a number between 0 and 10." });
    } else if (req.body.category_id && typeof req.body.category_id !== 'number') {
        return res.status(400).json({ error: "Category ID must be a number." });
    } 
    // si toutes les validations passent, je continue
    console.log('Movie data is valid');
    next();
}