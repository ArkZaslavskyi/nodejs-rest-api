const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const { User } = require("../models");
const { requestError } = require("../helpers/apiHelpers");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { VERIFIED_SENDER: sender } = process.env;

// =======< signUp >======= //
const signUp = async (email, password) => {
  const verificationToken = uuidv4();

  const user = new User({ email, password, verificationToken });
  const signedUser = await user.save();

  // create & send e-mail vith verification string
  const msg = {
    to: email, // Change to your recipient
    from: sender, // Change to your verified sender
    subject: "Thank you for registration!",
    text: `Please, confirm youe e-mail address GET http://localhost:3000/users/verify/${verificationToken}`,
    html: `Please, <a href="http://localhost:3000/users/verify/${verificationToken}">confirm</a> youe e-mail address`,
  };
  await sgMail.send(msg);

  return signedUser;
};

// =======< verification >======= //
const verification = async (verificationToken) => {
  const user = await User.findOne({ verificationToken, verify: false });

  if (!user) {
    throw requestError(404, "User not found");
  }

  // create & send e-mail vith confirm verification
  const msg = {
    to: user.email, // Change to your recipient
    from: sender, // Change to your verified sender
    subject: "Thank you for confirming your registration!",
    text: "Your registration is done",
    html: "Your registration is done",
  };
  await sgMail.send(msg);

  user.verificationToken = null;
  user.verify = true;

  await user.save();

  return true;
};

// =======< resendingEmail >======= //
const resendingEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(404, "User not found");
  }

  const { verify, verificationToken } = user;

  // checking if the user is verified
  if (verify) {
    throw requestError(400, "Verification has already been passed");
  }

  const msg = {
    to: email, // Change to your recipient
    from: sender, // Change to your verified sender
    subject: "Thank you for registration!",
    text: `Please, confirm youe e-mail address GET http://localhost:3000/users/verify/${verificationToken}`,
    html: `Please, <a href="http://localhost:3000/users/verify/${verificationToken}">confirm</a> youe e-mail address`,
  };
  await sgMail.send(msg);

  return true;
};

// =======< login >======= //
const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw requestError(401, "Email or password is wrong");
  }

  // checking if the user is verified
  if (!user.verify) {
    throw requestError(401, "Verified is wrong");
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

// =======< logout >=======
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

// =======< patchUserAvatarById >=======
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
  resendingEmail,
  login,
  logout,
  updateUserSubscriptionById,
  patchUserAvatarById,
};
