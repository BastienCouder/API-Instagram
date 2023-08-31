const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

//Ajouter un Commentaire
module.exports.commentPost = async (req, res) => {
  const { id } = req.params;
  const { commenterId, commenterPseudo, text } = req.body;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send("ID inconnu : " + id);
  }
  try {
    const CommentPost = await PostModel.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            commenterId,
            commenterPseudo,
            text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    );
    res.status(200).send(CommentPost);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

//Éditer un Commentaire
module.exports.editCommentPost = async (req, res) => {
  const { id } = req.params;
  const { commentId, text } = req.body;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send("ID inconnu : " + id);
  }
  try {
    const updatedCommentPost = await PostModel.findOneAndUpdate(
      { _id: id, "comments._id": commentId },
      { $set: { "comments.$.text": text } },
      { new: true }
    );
    if (!updatedCommentPost) {
      return res
        .status(404)
        .send("Commentaire non trouvé pour l'ID : " + commentId);
    }
    res.status(200).send(updatedCommentPost);
  } catch (error) {
    console.log("Erreur lors de la modification du commentaire : " + error);
    res.status(500).send({ message: error });
  }
};

//Supprimer un Commentaire
module.exports.deleteCommentPost = async (req, res) => {
  const { id } = req.params;
  const { commentId } = req.body;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send("ID inconnu : " + id);
  }

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
    if (!updatedPost) {
      return res
        .status(404)
        .send("Commentaire non trouvé pour l'ID : " + commentId);
    }
    res.status(200).send(updatedPost);
  } catch (error) {
    console.log("Erreur lors de la suppression du commentaire : " + error);
    res.status(500).send({ message: error });
  }
};

//Like un Commentaire
module.exports.likeComment = async (req, res) => {
  const { commentId } = req.params;
  const { commenterId } = req.body;

  try {
    if (!ObjectID.isValid(commentId)) {
      return res.status(400).send("ID inconnu : " + commentId);
    }

    const comment = await PostModel.findOneAndUpdate(
      { "comments._id": commentId },
      { $addToSet: { "comments.$[comment].likers": commenterId } },
      { new: true, arrayFilters: [{ "comment._id": commentId }] }
    );

    if (!comment) {
      return res
        .status(404)
        .send("Commentaire non trouvé pour l'ID : " + commenterId);
    }

    const user = await UserModel.findByIdAndUpdate(
      commenterId,
      { $addToSet: { likedComments: commenterId } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .send("Utilisateur non trouvé pour l'ID : " + commenterId);
    }

    return res.status(200).send({ message: "Commentaire liké", comment });
  } catch (error) {
    console.error("Erreur lors du like du commentaire :", error);
    return res
      .status(500)
      .send(
        "Une erreur est survenue lors du like du commentaire. " +
          commentId +
          commenterId
      );
  }
};

//Dislike un Commentaire
module.exports.dislikeComment = async (req, res) => {
  const { commentId } = req.params;
  const { commenterId } = req.body;
  if (!ObjectID.isValid(commentId)) {
    return res.status(400).send("ID inconnu : " + commentId);
  }

  try {
    const dislikePost = await PostModel.findOneAndUpdate(
      { "comments._id": commentId },
      { $pull: { "comments.$[comment].likers": commenterId } },
      { new: true, arrayFilters: [{ "comment._id": commentId }] }
    );

    return res
      .status(200)
      .send({ message: "Commentaire disliké", dislikePost });
  } catch (error) {
    console.error("Erreur lors du like du commentaire :", error);
    return res
      .status(500)
      .send(
        "Une erreur est survenue lors du like du commentaire. " +
          commentId +
          commenterId
      );
  }
};
