const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password -email -googleId");
    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs : ", error);
    res
      .status(500)
      .send({ message: "Erreur lors de la récupération des utilisateurs." });
  }
};

module.exports.userInfo = async (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send("ID inconnu : " + id);
  }

  try {
    const user = await UserModel.findById(id).select("-password -email").exec();
    if (!user) {
      return res.status(404).send("Utilisateur non trouvé pour l'ID : " + id);
    }
    res.json(user);
  } catch (error) {
    console.error("Erreur lors de la recherche de l'utilisateur : ", error);
    res
      .status(500)
      .send({ message: "Erreur lors de la recherche de l'utilisateur." });
  }
};

module.exports.userUpdate = async (req, res) => {
  const { id } = req.params;
  const { pseudo, bio } = req.body;

  if (!ObjectID.isValid(id)) {
    return res.status(400).json({ error: "ID inconnu : " + id });
  }

  try {
    const existingUserWithPseudo = await UserModel.findOne({ pseudo });

    if (
      existingUserWithPseudo &&
      existingUserWithPseudo._id.toString() !== id
    ) {
      return res.status(201).json({
        error: "Ce pseudo est déjà utilisé par un autre utilisateur.",
      });
    }

    if (pseudo.length > 15) {
      return res.status(201).json({
        error: "Le pseudo doit contenir moins de 16 caractères.",
      });
    }

    const user = await UserModel.findById(id);

    if (user.pseudoChanged) {
      return res.status(400).json({
        error: "Vous ne pouvez plus modifier votre pseudo.",
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { pseudo: pseudo, bio: bio, pseudoChanged: true },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ error: "Utilisateur non trouvé pour l'ID : " + id });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
    res.status(500).json({
      error: "Erreur lors de la mise à jour de l'utilisateur.",
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send("ID inconnu : " + id);
  }

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("Utilisateur non trouvé pour l'ID : " + id);
    }

    // Récupérer les listes de followers et de following
    const followers = user.followers;
    const following = user.following;

    // Parcourir les followers et les retirer de leurs listes de following
    for (const followerId of followers) {
      const follower = await UserModel.findById(followerId);
      if (follower) {
        follower.following.pull(id); // Retirer l'utilisateur à supprimer de la liste de following du follower
        await follower.save();
      }
    }

    // Parcourir les utilisateurs suivis et les retirer de leur liste de followers
    for (const followingId of following) {
      const followedUser = await UserModel.findById(followingId);
      if (followedUser) {
        followedUser.followers.pull(id); // Retirer l'utilisateur à supprimer de la liste de followers de l'utilisateur suivi
        await followedUser.save();
      }
    }

    // Supprimer l'utilisateur lui-même
    await user.deleteOne();

    res.status(200).send({ message: "Utilisateur supprimé " + id });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur : ", error);
    res
      .status(500)
      .send({ message: "Erreur lors de la suppression de l'utilisateur." });
  }
};

module.exports.follow = async (req, res) => {
  const { idToFollow } = req.body;
  const { id } = req.params;

  if (!ObjectID.isValid(id) || !ObjectID.isValid(idToFollow)) {
    return res.status(400).send("ID inconnu.");
  }

  try {
    const user = await UserModel.findById(id);
    const userToFollow = await UserModel.findById(idToFollow);

    if (!user || !userToFollow) {
      return res.status(404).send("Utilisateur non trouvé.");
    }

    user.following.push(idToFollow);
    userToFollow.followers.push(id);

    await Promise.all([user.save(), userToFollow.save()]);

    res.status(200).send(id + " à follow " + idToFollow);
  } catch (error) {
    console.error("Erreur lors de la mise à jour des relations : ", error);
    res
      .status(500)
      .send({ message: "Erreur lors de la mise à jour des relations." });
  }
};

module.exports.unfollow = async (req, res) => {
  const { id } = req.params;
  const { idToUnFollow } = req.body;

  if (!ObjectID.isValid(id) || !ObjectID.isValid(idToUnFollow)) {
    return res.status(400).send("ID inconnu.");
  }

  try {
    const user = await UserModel.findById(id);
    const userToUnfollow = await UserModel.findById(idToUnFollow);

    if (!user || !userToUnfollow) {
      return res.status(404).send("Utilisateur non trouvé.");
    }

    user.following.pull(idToUnFollow);
    userToUnfollow.followers.pull(id);

    await Promise.all([user.save(), userToUnfollow.save()]);

    res.status(200).send(id + " à unfollow " + idToUnFollow);
  } catch (error) {
    console.error("Erreur lors de la mise à jour des relations : ", error);
    res
      .status(500)
      .send({ message: "Erreur lors de la mise à jour des relations." });
  }
};
