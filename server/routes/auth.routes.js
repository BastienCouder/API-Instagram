const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/auth.controller");
const passwordController = require("../controllers/password.controller");
const { createToken, maxAge } = require("../utils/jwt.utils");
const userModel = require("../models/user.model");

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
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
        // L'utilisateur existe déjà, connectez-le en créant un token JWT
        const token = createToken(existingUser._id);

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
