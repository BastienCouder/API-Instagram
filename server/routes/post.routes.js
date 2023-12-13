const express = require("express");
const postController = require("../controllers/post.controller");
const replyController = require("../controllers/reply.controller");
const commentController = require("../controllers/comment.controller");
const router = express.Router();

//posts
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Récupère tous les posts
 *     responses:
 *       200:
 *         description: Liste de tous les posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Erreur serveur
 */
router.get("/", postController.readPost);
/**
 * @swagger
 * /post:
 *   post:
 *     summary: Ajoute un nouveau post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - posterId
 *               - message
 *             properties:
 *               posterId:
 *                 type: integer
 *                 format: int64
 *                 description: ID unique de l'utilisateur qui poste
 *               message:
 *                 type: string
 *                 description: Le message du post
 *               picture:
 *                 type: string
 *                 format: binary
 *                 description: L'image du post
 *     responses:
 *       200:
 *         description: Post créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   format: int64
 *                 posterId:
 *                   type: integer
 *                   format: int64
 *                 message:
 *                   type: string
 *                 picture:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/", postController.createPost);
/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Édite un post existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du post à éditer
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Nouveau message du post
 *     responses:
 *       200:
 *         description: Post édité avec succès
 *       400:
 *         description: ID inconnu ou invalid
 *       404:
 *         description: Post non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id", postController.editPost);
/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Supprime un post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du post à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post supprimé avec succès
 *       400:
 *         description: ID inconnu ou invalid
 *       404:
 *         description: Post non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", postController.deletePost);
/**
 * @swagger
 * /post/like/{id}:
 *   patch:
 *     summary: Like un post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du post à liker
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID de l'utilisateur qui like le post
 *     responses:
 *       200:
 *         description: Post liké avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 likers:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: ID inconnu ou invalid
 *       500:
 *         description: Erreur serveur
 */
router.patch("/like-post/:id", postController.likePost);
/**
 * @swagger
 * /posts/dislike/{id}:
 *   patch:
 *     summary: Dislike un post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du post à disliker
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID de l'utilisateur qui dislike le post
 *     responses:
 *       200:
 *         description: Post disliké avec succès
 *       400:
 *         description: ID inconnu ou invalid
 *       500:
 *         description: Erreur serveur
 */
router.patch("/dislike-post/:id", postController.dislikePost);

//comments
/**
 * @swagger
 * /comment-post/{id}:
 *   patch:
 *     summary: Ajoute un commentaire à un post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du post à commenter
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - commenterId
 *               - commenterPseudo
 *               - text
 *             properties:
 *               commenterId:
 *                 type: string
 *                 description: ID de l'utilisateur qui commente
 *               commenterPseudo:
 *                 type: string
 *                 description: Pseudo de l'utilisateur qui commente
 *               text:
 *                 type: string
 *                 description: Texte du commentaire
 *     responses:
 *       200:
 *         description: Commentaire ajouté avec succès
 *       400:
 *         description: ID inconnu ou informations manquantes
 *       500:
 *         description: Erreur serveur
 */
router.patch("/comment-post/:id", commentController.commentPost);
/**
 * @swagger
 * /edit-comment-post/{id}:
 *   patch:
 *     summary: Édite un commentaire sur un post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du post contenant le commentaire
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - commentId
 *               - text
 *             properties:
 *               commentId:
 *                 type: string
 *                 description: ID du commentaire à éditer
 *               text:
 *                 type: string
 *                 description: Nouveau texte du commentaire
 *     responses:
 *       200:
 *         description: Commentaire édité avec succès
 *       400:
 *         description: ID inconnu ou informations manquantes
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.patch("/edit-comment-post/:id", commentController.editCommentPost);
/**
 * @swagger
 * /delete-comment-post/{id}:
 *   patch:
 *     summary: Supprime un commentaire d'un post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du post contenant le commentaire
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - commentId
 *             properties:
 *               commentId:
 *                 type: string
 *                 description: ID du commentaire à supprimer
 *     responses:
 *       200:
 *         description: Commentaire supprimé avec succès
 *       400:
 *         description: ID inconnu ou informations manquantes
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.patch("/delete-comment-post/:id", commentController.deleteCommentPost);
/**
 * @swagger
 * /like-comment/{commentId}:
 *   patch:
 *     summary: Like un commentaire
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID du commentaire à liker
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - commenterId
 *             properties:
 *               commenterId:
 *                 type: string
 *                 description: ID de l'utilisateur qui like le commentaire
 *     responses:
 *       200:
 *         description: Commentaire liké avec succès
 *       400:
 *         description: ID inconnu ou informations manquantes
 *       404:
 *         description: Commentaire ou utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.patch("/like-comment/:commentId", commentController.likeComment);
/**
 * @swagger
 * /dislike-comment/{commentId}:
 *   patch:
 *     summary: Dislike un commentaire
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID du commentaire à disliker
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - commenterId
 *             properties:
 *               commenterId:
 *                 type: string
 *                 description: ID de l'utilisateur qui dislike le commentaire
 *     responses:
 *       200:
 *         description: Commentaire disliké avec succès
 *       400:
 *         description: ID inconnu ou informations manquantes
 *       404:
 *         description: Commentaire ou utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.patch("/dislike-comment/:commentId", commentController.dislikeComment);

//Repliers
/**
 * @swagger
 * /{commentId}/reply:
 *   patch:
 *     summary: Répondre à un commentaire
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID du commentaire auquel répondre
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - replierId
 *               - replierPseudo
 *               - text
 *             properties:
 *               replierId:
 *                 type: string
 *                 description: ID de l'utilisateur qui répond
 *               replierPseudo:
 *                 type: string
 *                 description: Pseudo de l'utilisateur qui répond
 *               text:
 *                 type: string
 *                 description: Texte de la réponse
 *     responses:
 *       200:
 *         description: Réponse au commentaire ajoutée avec succès
 *       400:
 *         description: ID inconnu ou informations manquantes
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.patch("/:commentId/reply", replyController.replyCommentPost);

/**
 * @swagger
 * /{commentId}/reply-edit:
 *   patch:
 *     summary: Éditer une réponse à un commentaire
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID du commentaire dont la réponse est éditée
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - replierId
 *               - text
 *             properties:
 *               replierId:
 *                 type: string
 *                 description: ID de la réponse à éditer
 *               text:
 *                 type: string
 *                 description: Nouveau texte de la réponse
 *     responses:
 *       200:
 *         description: Réponse éditée avec succès
 *       400:
 *         description: ID inconnu ou informations manquantes
 *       404:
 *         description: Commentaire ou réponse non trouvée
 *       500:
 *         description: Erreur serveur
 */

router.patch("/:commentId/reply-edit", replyController.replyEditCommentPost);
/**
 * @swagger
 * /{commentId}/reply-delete:
 *   patch:
 *     summary: Supprimer une réponse à un commentaire
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID du commentaire dont la réponse est supprimée
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - replierId
 *             properties:
 *               replierId:
 *                 type: string
 *                 description: ID de la réponse à supprimer
 *     responses:
 *       200:
 *         description: Réponse supprimée avec succès
 *       400:
 *         description: ID inconnu ou informations manquantes
 *       404:
 *         description: Commentaire ou réponse non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.patch(
  "/:commentId/reply-delete",
  replyController.replyDeleteCommentPost
);

module.exports = router;
