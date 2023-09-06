const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    googleId: { type: String },
    pseudo: {
      type: String,
      minLength: 3,
      maxLength: 16,
      unique: true,
      lowercase: true,
      trim: true,
    },
    pseudoChanged: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      max: 1024,
      minlength: 6,
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
    bio: {
      type: String,
      max: 500,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likedPosts: { type: [String] },
    likedComments: { type: [String] },
  },

  {
    timestamps: true,
  }
);

// Fonction exécutée avant la sauvegarde dans la base de données
userSchema.pre("save", async function (next) {
  // Vérifiez si le mot de passe est défini
  if (this.isModified("password")) {
    const saltRounds = 10; // Coût du hachage du mot de passe
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.statics.login = async function (email, password) {
  try {
    // Recherche de l'utilisateur par email
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("email not found");
    }

    if (!user.password) {
      throw new Error("Password not set for this user");
    }

    // Comparaison du mot de passe fourni avec le mot de passe hashé enregistré dans la base de données
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    // Si tout est correct, renvoie l'utilisateur
    return user;
  } catch (error) {
    // Gérer les erreurs de manière appropriée, par exemple, en renvoyant des messages d'erreur spécifiques
    console.log("Login failed: " + error.message);

    throw new Error("Login failed: " + error.message);
  }
};

module.exports = mongoose.model("User", userSchema);
