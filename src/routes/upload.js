const express = require("express");
const auth = require('../middlewares/auth')
const router = express.Router();
const { uploadPostCloud, uploadAvatarCloud, uploadMessageCloud } = require("../../cloudinary");

const UploadController = require("../controllers/UploadController");

router.post(
  "/post",
  auth,
  uploadPostCloud.single("file"),
  UploadController.upload
);
router.post(
  "/message",
  auth,
  uploadMessageCloud.single("file"),
  UploadController.upload
);
router.post(
  "/avatar",
  auth,
  uploadAvatarCloud.single("file"),
  UploadController.upload
);

module.exports = router;