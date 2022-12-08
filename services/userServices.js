const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../models");
const { requestError } = require("../helpers/apiHelpers");

const signUp = async (email, password) => {
  const user = new User({ email, password });
  const signedUser = await user.save();
  return signedUser;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw requestError(401, "Email or password is wrong"); // `Email ${email} is wrong`
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw requestError(401, "Email or password is wrong"); // 'Password is wrong'
  }

  const { JWT_SECRET: secret } = process.env;

  const token = jwt.sign({ _id: user._id, createdAt: user.createdAt }, secret); //, { expiresIn: "15m" }

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

const currentUser = async (id) => {
  const user = await User.findById(id);
  return user;
};

const updateUserSubscriptionById = async (id, body) => {
  const user = await User.findByIdAndUpdate(
    id,
    { $set: body },
    { returnDocument: "after" }
  );

  return user;
};

module.exports = {
  signUp,
  login,
  logout,
  currentUser,
  updateUserSubscriptionById,
};
