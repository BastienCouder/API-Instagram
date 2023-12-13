const express = require("express");
const userController = require("../controllers/user.controller");
const profilController = require("../controllers/profil.controller");
const router = express.Router();
const multer = require("multer");
const upload = multer();

//auth

//users & user
/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *       500:
 *         description: Erreur lors de la récupération des utilisateurs
 */
router.get("/", userController.getAllUser);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtenir les informations d'un utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès
 *       400:
 *         description: ID inconnu
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur lors de la recherche de l'utilisateur
 */

router.get("/:id", userController.userInfo);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Mettre à jour les informations d'un utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pseudo:
 *                 type: string
 *                 description: Nouveau pseudo de l'utilisateur
 *               bio:
 *                 type: string
 *                 description: Nouvelle biographie de l'utilisateur
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur mises à jour avec succès
 *       400:
 *         description: ID inconnu ou pseudo déjà utilisé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur lors de la mise à jour de l'utilisateur
 */

router.put("/:id", userController.userUpdate);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       400:
 *         description: ID inconnu
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur lors de la suppression de l'utilisateur
 */
router.delete("/:id", userController.deleteUser);

/**
 * @swagger
 * /users/follow/{id}:
 *   patch:
 *     summary: Suivre un autre utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur qui veut suivre
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToFollow:
 *                 type: string
 *                 description: ID de l'utilisateur à suivre
 *     responses:
 *       200:
 *         description: Suivi effectué avec succès
 *       400:
 *         description: ID inconnu
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur lors de la mise à jour des relations
 */
router.patch("/follow/:id", userController.follow);
/**
 * @swagger
 * /users/unfollow/{id}:
 *   patch:
 *     summary: Ne plus suivre un utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur qui ne veut plus suivre
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToUnFollow:
 *                 type: string
 *                 description: ID de l'utilisateur à ne plus suivre
 *     responses:
 *       200:
 *         description: Ne plus suivre effectué avec succès
 *       400:
 *         description: ID inconnu
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur lors de la mise à jour des relations
 */
router.patch("/unfollow/:id", userController.unfollow);

//upload avatar
/**
 * @swagger
 * /profil/:
 *   post:
 *     summary: Télécharger une image de profil pour un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - file
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID de l'utilisateur pour lequel l'image de profil est mise à jour
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image de profil à télécharger
 *     responses:
 *       201:
 *         description: Image de profil enregistrée avec succès
 *       400:
 *         description: Aucune image trouvée ou ID d'utilisateur manquant
 *       500:
 *         description: Erreur serveur lors de l'upload ou de la mise à jour de l'image de profil
 */
router.post("/profil", profilController.uploadProfil);

module.exports = router;
