const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const { UploadErrors } = require("../utils/errors.utils");
const uploadPost = require("../middlewares/uploadPost.middleware");
const multer = require("multer");
const deleteFile = require("../middlewares/deleteUpload.middleware");

//Récupérer tous les Posts
module.exports.readPost = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 });
    res.status(200).send(posts);
  } catch (error) {
    console.log("Erreur lors de la récupération des posts : " + error);
    res.status(500).send("Erreur lors de la récupération des posts");
  }
};

module.exports.createPost = async (req, res) => {
  uploadPost(req, res, async (err) => {
    if (err) {
      console.log("Erreur lors de l'upload :", err);

      if (err.message === "Aucune image trouvée.") {
        return res.status(400).send({ error: err.message });
      }

      const errors = UploadErrors(err);
      return res.status(200).json({ error: errors });
    }

    if (!req.file) {
      return res.status(400).send({ error: "Aucune image trouvée." });
    }

    const { posterId, message } = req.body;
    const picturePath = "uploads/post/" + req.file.filename;

    try {
      const post = await PostModel.create({
        posterId,
        picture: picturePath,
        message,
        likers: [],
      });
      return res.status(200).send(post);
    } catch (error) {
      console.log("Erreur lors de la création du post :", error);
      return res.status(500).send({
        error: "Une erreur est survenue lors de la création du post.",
      });
    }
  });
};

//Éditer un Post
module.exports.editPost = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send("ID inconnu : " + id);
  }

  try {
    const updateRecord = {
      message,
    };
    const updatePost = await PostModel.findByIdAndUpdate(
      id,
      { $set: updateRecord },
      { new: true }
    );
    if (!updatePost) {
      return res.status(404).send("Message non trouvé pour l'ID : " + id);
    }
    res.status(200).send(updatePost);
  } catch (error) {
    console.log("Erreur lors de la modification du message : " + error);
    res.status(500).send({ message: error });
  }
};

//Supprimer un Post

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send("ID inconnu : " + id);
  }

  try {
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(400).send({ message: "Ce post n'existe pas" });
    }
    const fileName = post.picture;
    deleteFile(fileName);
    await post.deleteOne();
    res.status(200).send({
      message: "Post supprimé " + id,
    });
  } catch (error) {
    console.log("Erreur lors de la suppression du post : " + error);
    res.status(500).send({ message: error });
  }
};

//Like un Post
module.exports.likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send("ID inconnu : " + id);
  }
  try {
    const likePost = await PostModel.findByIdAndUpdate(
      id,
      { $addToSet: { likers: userId } },
      { new: true }
    );
    await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { likedPosts: id } },
      { new: true }
    );
    res.status(200).send(likePost);
  } catch (error) {
    return res.status(500).send(error);
  }
};

//Dislike un Post
module.exports.dislikePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const dislikePost = await PostModel.findByIdAndUpdate(
      id,
      { $pull: { likers: userId } },
      { new: true }
    );
    res.status(200).send(dislikePost);
  } catch (error) {
    console.log("Erreur lors du dislike du post : " + error);
    res.status(500).send({ message: error });
  }
};
