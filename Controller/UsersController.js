import database from "../Config/database.js";

// Fonction pour insérer un nouvel utilisateur
export async function createUser(req, res) {
    // Destructuration des données de la requête
    const  { name, email, hashedPassword } = req.body;
// Liason avec la base de données pour insérer l'utilisateur
    try {
        const [result] = await database.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
        // Envoi de la réponse avec le statut 201 et l'ID de l'utilisateur inséré
            res.json(201).json({ id: result.insertId });
    } catch (err) {
        // En cas d'erreur, on log l'erreur et on envoie un statut 500
        console.log(err);
        res.sendStatus(500).json({ error: "Internal server error" });
    }
};