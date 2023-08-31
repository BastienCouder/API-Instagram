const multer = require("multer");

module.exports.signUpErrors = (error) => {
  let errors = {
    pseudo: "",
    email: "",
    password: "",
  };
  if (error.message.includes("pseudo"))
    errors.pseudo = "Pseudo incorrect ou déjà pris";

  if (error.message.includes("email")) errors.email = "Email incorrect";

  if (error.message.includes("password"))
    errors.password = "Le mot de passe doit faire au moins 6 caractères";

  if (error.code === 11000 && Object.keys(error.keyValue)[0] === "pseudo")
    errors.pseudo = "Ce pseudo est déjà pris";

  if (error.code === 11000 && Object.keys(error.keyValue)[0] === "email")
    errors.email = "Cet email est déjà utilisé";

  return errors;
};

module.exports.signInErrors = (error) => {
  let errors = {
    email: "",
    password: "",
  };

  if (error.message.includes("email")) errors.email = "Email inconnu";

  if (error.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";

  return errors;
};

module.exports.UploadErrors = (error) => {
  let errors = {
    format: "",
    maxSize: "",
  };

  if (error.message.includes("Type de fichier non autorisé.")) {
    errors.format = "Format de fichier incompatible";
  }

  if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
    errors.maxSize = "Le fichier dépasse la taille maximale autorisée (5 Mo)";
  }

  return errors;
};

module.exports.signInErrors = (error) => {
  let errors = {
    email: "",
    password: "",
  };

  if (error.message.includes("email")) errors.email = "Email inconnu";

  if (error.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";

  return errors;
};

module.exports.ResetPasswordErrors = (tokenInfo, newPassword, user) => {
  let errors = {
    invalidToken: "",
    expiredToken: "",
    samePassword: "",
  };

  if (!tokenInfo) {
    errors.invalidToken = "Invalid token";
  }

  if (tokenInfo.expiresAt < Date.now()) {
    errors.expiredToken = "Token has expired";
  }

  if (newPassword === user.password) {
    errors.samePassword =
      "Le nouveau mot de passe ne peut pas être identique à l'ancien";
  }

  return errors;
};
