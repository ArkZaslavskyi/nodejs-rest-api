const express = require("express");
const path = require("path");

const router = new express.Router();
const avatarDir = path.resolve(__dirname, "../../public", "avatars");

router.use("/avatars", express.static(avatarDir));
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, fileDir);
//   },
//   filename: (req, file, cb) => {
//     const [, extension] = file.originalname.split(".");
//     cb(null, `${uuidv4()}.${extension}`);
//   },
// });

// const uploadMiddleware = multer({ storage });

// router.post(
//   "/upload",
//   uploadMiddleware.single("avatar"),
//   asyncWrapper(ctrl.upload)
// );

module.exports = router;
