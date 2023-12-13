const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/auth.controller");
const passwordController = require("../controllers/password.controller");
const { createToken, maxAge } = require("../utils/jwt.utils");
const userModel = require("../models/user.model");

// auth
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscrire un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pseudo
 *               - email
 *               - password
 *             properties:
 *               pseudo:
 *                 type: string
 *                 description: Pseudo de l'utilisateur
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *     responses:
 *       201:
 *         description: Inscription réussie
 *       422:
 *         description: Élément manquant dans la demande
 *       500:
 *         description: Erreur serveur lors de l'inscription
 */
router.post("/register", authController.signUp);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connecter un utilisateur existant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       422:
 *         description: Élément manquant dans la demande
 *       500:
 *         description: Erreur serveur lors de la connexion
 */
router.post("/login", authController.signIn);
/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Déconnecter un utilisateur
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *       500:
 *         description: Erreur serveur lors de la déconnexion
 */
router.get("/logout", authController.logout);
router.post("/forgot-password", passwordController.requestReset);
router.post("/reset-password/:token", passwordController.resetPassword);

router.get("/google", passport.authenticate("google", ["profile", "email"]));
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),

  async function (req, res) {
    try {
      // Vérifiez si l'email existe déjà dans la base de données
      const existingUser = await userModel.findOne({ email: req.user.email });

      if (existingUser) {
        const token = createToken(existingUser._id);
        console.log("cookie jwt");

        res.cookie("jwt", token, {
          httpOnly: false,
          maxAge,
          secure: true,
          sameSite: "none",
        });
        console.log(token);

        res.redirect(`${process.env.CLIENT_URL}`);
      } else {
        res.redirect(`${process.env.CLIENT_URL}/register`);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
module.exports = router;
