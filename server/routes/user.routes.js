const express = require("express");
const userController = require("../controllers/user.controller");
const profilController = require("../controllers/profil.controller");
const router = express.Router();
const multer = require("multer");
const upload = multer();

//auth

//users & user
router.get("/", userController.getAllUser);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.userUpdate);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

//upload avatar
router.post("/profil", profilController.uploadProfil);

module.exports = router;
