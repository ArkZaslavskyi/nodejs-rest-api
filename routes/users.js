const { Router } = require("express");
const ctrl = require("../controllers");

const { asyncWrapper } = require("../helpers/apiHelpers");
const {
  validationBody,
  isValidId,
  authMiddleware,
  uploadMiddleware,
} = require("../middlewares");

const { schemaUser, schemaUserSubscription } = require("../schemes");

const router = new Router();

router.post("/signup", validationBody(schemaUser), asyncWrapper(ctrl.signUp));
router.post("/login", validationBody(schemaUser), asyncWrapper(ctrl.login));
router.get("/logout", authMiddleware, asyncWrapper(ctrl.logout));
router.get("/current", authMiddleware, asyncWrapper(ctrl.current));

// const multer = require("multer");
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");

// const tmpDir = path.resolve(__dirname, "../tmp");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log(tmpDir);
//     cb(null, tmpDir);
//   },
//   filename: (req, file, cb) => {
//     const [, ext] = file.originalname.split(".");
//     cb(null, `${uuidv4()}.${ext}`);
//   },
// });
// const uploadMiddleware = multer({ storage });

router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  asyncWrapper(ctrl.patchUserAvatar)
);

router.patch(
  "/:id",
  isValidId,
  validationBody(schemaUserSubscription),
  authMiddleware,
  asyncWrapper(ctrl.patchUserSubscription)
);

module.exports = router;
