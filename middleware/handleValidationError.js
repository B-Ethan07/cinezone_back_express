import { validationResult } from "express-validator";

export default function handleValidationError(req, res, next) {
    // Vérifie si des erreurs de validation existent
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Si des erreurs sont présentes, retourne une réponse 400 avec les erreurs
        return res.status(400).json({ errors: errors.array() });
    }
    // Si aucune erreur, passe au middleware suivant
    next();
}