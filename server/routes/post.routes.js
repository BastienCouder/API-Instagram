const express = require("express");
const postController = require("../controllers/post.controller");
const replyController = require("../controllers/reply.controller");
const commentController = require("../controllers/comment.controller");
const router = express.Router();

//posts
router.get("/", postController.readPost);
router.post("/", postController.createPost);
router.put("/:id", postController.editPost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/dislike-post/:id", postController.dislikePost);

//comments
router.patch("/comment-post/:id", commentController.commentPost);
router.patch("/edit-comment-post/:id", commentController.editCommentPost);
router.patch("/delete-comment-post/:id", commentController.deleteCommentPost);
router.patch("/like-comment/:commentId", commentController.likeComment);
router.patch("/dislike-comment/:commentId", commentController.dislikeComment);

//Repliers
router.patch("/:commentId/reply", replyController.replyCommentPost);
router.patch("/:commentId/reply-edit", replyController.replyEditCommentPost);
router.patch(
  "/:commentId/reply-delete",
  replyController.replyDeleteCommentPost
);

module.exports = router;
