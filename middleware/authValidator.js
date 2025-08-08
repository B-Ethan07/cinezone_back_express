import database from "../Config/database.js";
import bcrypt from 'bcrypt';

export async function checkEMailNotTaken(req, res, next) {
    const { email } = req.body;
    try {
        const [users] = await database.query("SELECT email FROM users WHERE email = ?", [email]);
        if (users.length > 0) {
            return res.status(400).json({ error: "Email is already taken" });
        }
        next();
    } catch (err) {
        console.error("Database error: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
}


export async function hashPassword(req, res, next) {
    try {
        const { password } = req.body;
        req.body.hashedPassword = await bcrypt.hash(password, 10);
        delete req.body.password; // Remove plain password from the request body
        next();
    } catch (err) {
        console.error(err);
        res.sendStatus(500).json({ error: "Internal server error" });
    }
}