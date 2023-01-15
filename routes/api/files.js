const express = require("express");
const path = require("path");

const router = new express.Router();
const avatarDir = path.resolve(__dirname, "../../public", "avatars");

router.use("/avatars", express.static(avatarDir));

module.exports = router;
