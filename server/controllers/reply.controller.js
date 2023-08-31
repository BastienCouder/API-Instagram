const PostModel = require("../models/post.model");
const ObjectID = require("mongoose").Types.ObjectId;

//Répondre à un commentaire
module.exports.replyCommentPost = async (req, res) => {
  const { commentId } = req.params;
  const { replierId, replierPseudo, text } = req.body;
  if (!ObjectID.isValid(commentId)) {
    return res.status(400).send("ID inconnu : " + commentId);
  }
  try {
    const replyCommentPost = await PostModel.findOneAndUpdate(
      { "comments._id": commentId },
      {
        $push: {
          "comments.$.replies": {
            replierId,
            replierPseudo,
            text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    );
    res.status(200).send(replyCommentPost);
    console.log(commentId);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

//Éditer une réponse
module.exports.replyEditCommentPost = async (req, res) => {
  const { commentId } = req.params;
  const { replierId, text } = req.body;
  if (!ObjectID.isValid(commentId)) {
    return res.status(400).send("ID inconnu : " + commentId);
  }
  try {
    const updatedReplyCommentPost = await PostModel.findOneAndUpdate(
      { "comments._id": commentId, "comments.replies._id": replierId }, // $inutile car recherche spécifique dans replies
      { $set: { "comments.$.replies.$[reply].text": text } }, // $utile car nous rentrons dans l'object replies + =>
      { new: true, arrayFilters: [{ "reply._id": replierId }] } // Filtrez le tableau replies pour mettre à jour la réponse spécifique
    );

    if (!updatedReplyCommentPost) {
      return res
        .status(404)
        .send(
          "Commentaire ou réponse non trouvée pour les IDs : " +
            commentId +
            ", " +
            replierId
        );
    }
    res.status(200).send(updatedReplyCommentPost);
  } catch (error) {
    console.log("Erreur lors de la modification du commentaire : " + error);
    res.status(500).send({ message: error });
  }
};

//Supprimer une réponse
module.exports.replyDeleteCommentPost = async (req, res) => {
  const { commentId } = req.params;
  const { replierId } = req.body;
  if (!ObjectID.isValid(commentId)) {
    return res.status(400).send("ID inconnu : " + commentId);
  }

  try {
    const updatedReplyPost = await PostModel.findOneAndUpdate(
      { "comments._id": commentId },
      {
        $pull: {
          "comments.$.replies": { _id: replierId },
        },
      },
      { new: true }
    );
    if (!updatedReplyPost) {
      return res
        .status(404)
        .send("Commentaire non trouvé pour l'ID : " + replierId);
    }
    res.status(200).send(updatedReplyPost);
  } catch (error) {
    console.log("Erreur lors de la suppression du commentaire : " + error);
    res.status(500).send({ message: error });
  }
};
