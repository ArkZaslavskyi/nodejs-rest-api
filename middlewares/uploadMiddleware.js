const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const tmpDir = path.resolve(__dirname, "../tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    const [, ext] = file.originalname.split(".");
    cb(null, `${uuidv4()}.${ext}`);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
