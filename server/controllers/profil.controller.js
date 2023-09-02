const UserModel = require("../models/user.model");
const uploadAvatar = require("../middlewares/uploadAvatar.middleware");
const multer = require("multer");
const { UploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfil = async (req, res) => {
  try {
    uploadAvatar(req, res, async (err) => {
      if (err) {
        console.error("Erreur lors de l'upload :", err);

        const errors = UploadErrors(err);
        return res.status(201).json({ error: errors });
      }

      if (!req.file) {
        return res.status(400).send({ error: "Aucune image trouvée." });
      }

      const userId = req.body.userId;

      if (!userId) {
        return res
          .status(400)
          .json({ error: "ID d'utilisateur manquant dans la demande." });
      }

      const picturePath = "/uploads/profil/" + req.file.filename;
      console.log(req.file.filename);
      console.log(req.file);
      try {
        const updatedUser = await UserModel.findByIdAndUpdate(
          userId,
          { $set: { picture: picturePath } },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        console.log(userId);
        console.log(updatedUser);
        return res.status(201).send({
          message: "Image de profil enregistrée avec succès !",
          data: updatedUser,
        });
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour de l'image de profil :",
          error
        );
        return res.status(500).send({ message: error.message });
      }
    });
  } catch (error) {
    console.error("Erreur lors de l'upload du profil :", error);
    return res.status(500).send({ message: error.message });
  }
};
