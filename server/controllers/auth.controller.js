const UserModel = require("../models/user.model");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
const { createToken, maxAge } = require("../utils/jwt.utils");

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;
  if (!pseudo || !email || !password) {
    return res.status(422).json({ message: "Il manque un élément" });
  }

  try {
    await UserModel.create({ pseudo, email, password });
    res.status(201).json({ message: "Inscription réussie" });
  } catch (error) {
    const errors = signUpErrors(error);
    res.status(201).json({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ message: "Il manque un élément" });
  }

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);

    // Stockez le token dans un cookie sécurisé.
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Connexion réussie" });
    console.log(token);
    console.log(user);
    console.log("reussie");
  } catch (error) {
    const errors = signInErrors(error);
    res.status(201).json({ errors });
  }
};

module.exports.logout = async (req, res) => {
  try {
    // Effacez le cookie sécurisé.
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (err) {
    console.error("Erreur lors de la déconnexion :", err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
