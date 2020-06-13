const express = require('express');
const router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

const profileController = require("../controllers/profile-controller.js");

router.get("/", profileController.index);

router.get("/editinfomation", profileController.editInfo);

router.post("/editinfomation", profileController.editInfoPost);

router.get("/editavatar", profileController.editAvatar);

router.post("/editavatar", upload.single('avatar'), profileController.editAvatarPost);

module.exports = router;