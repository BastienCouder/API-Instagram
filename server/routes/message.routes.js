const express = require("express");
const messageController = require("../controllers/message.controller");
const router = express.Router();

//Messages
/**
 * @swagger
 * /messages/:
 *   get:
 *     summary: Récupérer tous les messages
 *     responses:
 *       200:
 *         description: Liste de tous les messages récupérée avec succès
 *       500:
 *         description: Erreur lors de la récupération des messages
 */
router.get("/", messageController.readMessage);
/**
 * @swagger
 * /messages/:
 *   post:
 *     summary: Créer un nouveau message
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - sender
 *               - receiver
 *             properties:
 *               sender:
 *                 type: string
 *                 description: ID de l'expéditeur
 *               receiver:
 *                 type: string
 *                 description: ID du destinataire
 *               message:
 *                 type: string
 *                 description: Contenu du message
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image jointe au message
 *     responses:
 *       200:
 *         description: Message créé avec succès
 *       400:
 *         description: Erreur lors de l'envoi ou aucune image trouvée
 *       500:
 *         description: Erreur serveur lors de la création du message
 */
router.post("/", messageController.createMessage);
/**
 * @swagger
 * /messages/{id}:
 *   put:
 *     summary: Éditer un message
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du message à éditer
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
 *                 description: Nouveau contenu du message
 *     responses:
 *       200:
 *         description: Message édité avec succès
 *       400:
 *         description: ID inconnu ou message non trouvé
 *       404:
 *         description: Message non trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur lors de la modification du message
 */

router.put("/:id", messageController.editMessage);
/**
 * @swagger
 * /messages/{id}:
 *   delete:
 *     summary: Supprimer un message
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du message à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message supprimé avec succès
 *       400:
 *         description: ID inconnu ou message non existant
 *       500:
 *         description: Erreur serveur lors de la suppression du message
 */
router.delete("/:id", messageController.deleteMessage);

module.exports = router;
