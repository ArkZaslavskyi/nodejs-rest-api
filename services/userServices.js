const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
require("dotenv").config();

const { User } = require("../models");
const { requestError } = require("../helpers/apiHelpers");

// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signUp = async (email, password) => {
  const user = new User({ email, password });
  const signedUser = await user.save();

  return signedUser;
};

const verification = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw requestError(404, "User not found");
  }

  user.verificationToken = null;
  user.verify = true;
  user.save();

  return true;
};

// const msg = {
//   to: email, // Change to your recipient
//   from: "ark.thebest@gmail.com", // Change to your verified sender
//   subject: "thank you for registration",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

// await sgMail.send(msg);

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw requestError(401, "Email or password is wrong");
  }

  const { JWT_SECRET: secret } = process.env;
  const payload = { _id: user._id };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  await User.findByIdAndUpdate(
    user._id,
    { $set: { token } },
    { returnDocument: "after" }
  );

  return { user, token };
};

const logout = async (user) => {
  const { _id } = user;
  return await User.findByIdAndUpdate(_id, { $set: { token: null } });
};

const updateUserSubscriptionById = async (id, body) => {
  const user = await User.findByIdAndUpdate(
    id,
    { $set: body },
    { returnDocument: "after" }
  );

  return user;
};

const patchUserAvatarById = async (userId, file) => {
  const { path: tmpPath, filename } = file;

  const avatarsDir = path.resolve(__dirname, "../public", "avatars");
  const publicAvatarPath = path.resolve(avatarsDir, filename);
  try {
    // resizing avatar
    const avatar = await Jimp.read(tmpPath);
    await avatar.resize(250, 250);
    await avatar.writeAsync(tmpPath);

    // moving avatar to public folder
    await fs.rename(tmpPath, publicAvatarPath);

    // updating avatar's link to db
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { avatarURL: publicAvatarPath } },
      { returnDocument: "after" }
    );

    return user;
  } catch (error) {
    await fs.unlink(tmpPath);
    throw requestError(400, "Saving avatars error");
  }
};

module.exports = {
  signUp,
  verification,
  login,
  logout,
  updateUserSubscriptionById,
  patchUserAvatarById,
};
