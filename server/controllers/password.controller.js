const jwt = require("jsonwebtoken");
const Joi = require("joi");
const nodemailer = require("nodemailer");
const userModel = require("../models/user.model");

const EMAIL_UTILISATEUR = process.env.EMAIL_UTILISATEUR;
const PASSWORD_EMAIL_UTILISATEUR = process.env.PASSWORD_EMAIL_UTILISATEUR;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;

const tokenStorage = new Map();

// Fonction pour générer un token unique (UUID)
function generateUUID() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Configurez Nodemailer pour envoyer des e-mails
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_UTILISATEUR,
    pass: PASSWORD_EMAIL_UTILISATEUR,
  },
});

// Demande de réinitialisation de mot de passe
exports.requestReset = async (req, res) => {
  const { email } = req.body;

  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });
    const { error } = schema.validate({ email });

    if (error) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(201).json({ error: "Email introuvable" });
    }

    const resetToken = generateUUID(); // Générer un nouveau token à chaque demande

    tokenStorage.set(resetToken, {
      userId: user.id,
      expiresAt: Date.now() + 3600000, // Expiration dans 1 heure
    });

    // Envoyez un e-mail avec le lien de réinitialisation
    const mailOptions = {
      to: user.email,
      from: EMAIL_UTILISATEUR,
      subject: "Réinitialiser le mot de passe",
      text: `Pour réinitialiser votre mot de passe, cliquez sur le lien suivant : ${CLIENT_URL}/reset-password/${resetToken}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Email could not be sent" });
      }
      console.log("Email sent successfully");
      res.status(200).json({ message: "Email sent successfully" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Réinitialisation du mot de passe
exports.resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    // Vérifiez le token dans le stockage
    const tokenInfo = tokenStorage.get(resetToken);
    if (!tokenInfo) {
      const errors = ResetPasswordErrors(tokenInfo, newPassword, user);
      return res.status(400).json({ errors });
    }
    const userId = tokenInfo.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    // Après avoir utilisé le token, supprimez-le du stockage
    tokenStorage.delete(resetToken);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
