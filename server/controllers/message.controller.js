const MessageModel = require("../models/message.model");
const ObjectID = require("mongoose").Types.ObjectId;
const multer = require("multer");
const uploadMessage = require("../middlewares/uploadMessage.middleware");
const { UploadErrors } = require("../utils/errors.utils");
const deleteFile = require("../middlewares/deleteUpload.middleware");

//Récupérer tous les messages
module.exports.readMessage = async (req, res) => {
  try {
    const messages = await MessageModel.find().sort({ createdAt: -1 });
    res.status(200).send(messages);
  } catch (error) {
    console.log("Erreur lors de la récupération des messages : " + error);
    res.status(500).send("Erreur lors de la récupération des messages");
  }
};

//Créer un Message
module.exports.createMessage = async (req, res) => {
  uploadMessage(req, res, async (err) => {
    if (err) {
      console.log("Erreur lors de l'upload :", err);

      // Gérer l'erreur spécifique à createPost
      if (err.message === "Aucune image trouvée.") {
        return res.status(400).send({ error: err.message });
      }

      const errors = UploadErrors(err);
      return res.status(200).json({ error: errors });
    }

    const message = req.body.message || "";
    const { sender, receiver } = req.body;
    let picturePath = null;
    if (req.file) {
      picturePath = "/uploads/message/" + req.file.filename;
    }

    try {
      const messageUser = await MessageModel.create({
        message,
        sender,
        receiver,
        picture: picturePath,
        likers: [],
      });
      return res.status(200).send(messageUser);
    } catch (error) {
      console.log("Erreur lors de la création du message :", error);
      return res
        .status(500)
        .send({ error: "Erreur lors de la création du message." });
    }
  });
};

//Éditer un Message
module.exports.editMessage = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send("ID inconnu : " + id);
  }

  try {
    const updateUserMessage = {
      message,
      edited: true,
    };
    const updateMessage = await MessageModel.findByIdAndUpdate(
      id,
      { $set: updateUserMessage },
      { new: true }
    );

    if (!updateMessage) {
      return res.status(404).send("Message non trouvé pour l'ID : " + id);
    }
    const fileName = message.picture;
    deleteFile(fileName);
    res.status(200).send(updateMessage);
    console.log(updateUserMessage);
  } catch (error) {
    console.log("Erreur lors de la modification du message : " + error);
    res.status(500).send({ message: error });
  }
};

//Supprimer un Message
module.exports.deleteMessage = async (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send("ID inconnu : " + id);
  }

  try {
    const message = await MessageModel.findById(id);
    if (!message) {
      return res.status(400).send({ message: "Ce message n'existe pas" });
    }
    const fileName = message.picture;
    deleteFile(fileName);
    await message.deleteOne();
    res.status(200).send({
      message: "Message supprimé " + id,
    });
  } catch (error) {
    console.log("Erreur lors de la suppression du message : " + error);
    res.status(500).send({ message: error });
  }
};
