
import database from "../Config/database.js";
import jwt from 'jsonwebtoken';

// Fonction pour insérer un nouvel utilisateur
export async function createUser(req, res) {
    // Destructuration des données de la requête
    const  { name, email, hashedPassword } = req.body;
// Liason avec la base de données pour insérer l'utilisateur
    try {
        const [result] = await database.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
        // Envoi de la réponse avec le statut 201 et l'ID de l'utilisateur inséré
        return res.status(201).json({ id: result.insertId });

    } catch (err) {
        // En cas d'erreur, on log l'erreur et on envoie un statut 500
        console.log(err);
        return res.sendStatus(500).json({ error: "Internal server error" });
    }
};

export async function login(req, res) {
    // On récupère l'utilisateur de la requête
    const { user} = req;
    const now = Math.floor(Date.now() / 1000);
    // Génération du token JWT
    const token = jwt.sign({
    sub: user.id,
    iat: now,
    exp: now + 60 * 60 * 24, // Expiration dans 24 heures
}, process.env.JWT_SECRET);

    // On envoie le token dans un cookie HTTP-only
    // Le cookie est sécurisé et a une durée de vie de 24 heures
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: false /* process.env.NODE_ENV === "production" */, // Utiliser secure en production
        maxAge: 60 * 60 * 24 * 1000, 
    });
    /* console.log("Token JWT généré :", token);
    console.log("User ID:", user.id); */

    res.sendStatus(200);
}

export async function myProfile(req, res) {
    
    const { sub } = req.auth;
    // Vérifie si `req.auth` est défini avant d'essayer d'accéder à `sub`
    if (!req.auth || !req.auth.sub) {
        return res.status(401).json({ error: "Unauthorized: No valid token" });
    }
    try {
        const [users] = await database.query("SELECT * FROM users WHERE id = ?", [sub]);
        if (users.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(users[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}