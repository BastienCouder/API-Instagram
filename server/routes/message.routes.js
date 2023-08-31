const express = require("express");
const messageController = require("../controllers/message.controller");
const router = express.Router();

//Messages
router.get("/", messageController.readMessage);
router.post("/", messageController.createMessage);
router.put("/:id", messageController.editMessage);
router.delete("/:id", messageController.deleteMessage);
// router.patch("/like-post/:id", messageController.likeMessage);
// router.patch("/dislike-post/:id", messageController.dislikeMessage);

module.exports = router;
