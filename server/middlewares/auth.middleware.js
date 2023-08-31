const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      let user = await UserModel.findById(decodedToken.id);
      res.locals.user = user;
      next();
    } catch (error) {
      console.error("Erreur lors de la vérification du jeton :", error);
      res.locals.user = null;
      next();
    }
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      console.log(decodedToken.id);
      next();
    } catch (error) {
      console.error("Erreur lors de la vérification du jeton :", error);
      res.sendStatus(401);
    }
  } else {
    console.log("Pas de jeton");
    res.sendStatus(401);
  }
};
