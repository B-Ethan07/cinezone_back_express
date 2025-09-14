
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

export function login(req, res) {
  const { user } = req;
  // On prend le timestamp actuel (milliseconde)
  // on convertit en seconde et on arrondi
  const now = Math.floor(Date.now() / 1000);
  // dans le token, on place l'identifiant de l'user connecté
  // ainsi que le timestamp de création et d'expiration
  const token = jwt.sign(
    {
      sub: user.id,
      iat: now,
      exp:
        now +
        60 *
          60 *
          24 /* idéal serait que la durée d'expiration soit dans le .env*/,
    },
    process.env.JWT_SECRET
  );
  // httponly pour qu'il ne soit pas accessible via Javascript
  // secure pour préciser que ns n'utilisons pas HTTPS
  // expire dans 1 jr (à mettre dans le .env)
res.cookie("access_token", token, {
  httpOnly: true,
  secure: false,
  maxAge: 60 * 60 * 24 * 1000,
  sameSite: "lax",
});
  res.status(200).send({ message: "ok" });
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
  export function logout(req, res) {
  res.clearCookie("access_token"); // ← le nom du cookie doit correspondre à celui défini dans login
  res.status(200).send({ message: "Déconnecté avec succès" });
}
