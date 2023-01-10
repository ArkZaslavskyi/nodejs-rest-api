const multer = require("multer");
const path = require("path");

const tmpDir = path.resolve(__dirname, "../tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    const { _id: userId } = req.user;
    const [, ext] = file.originalname.split(".");
    cb(null, `${userId}.${ext}`);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
