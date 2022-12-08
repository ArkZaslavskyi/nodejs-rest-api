const services = require("../services");
// const { requestError } = require("../helpers/apiHelpers");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const { subscription } = await services.signUp(email, password);

  res.status(201).json({ user: { email, subscription } });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const {
    user: { subscription },
    token,
  } = await services.login(email, password);

  res.status(200).json({ token, user: { email, subscription: subscription } });
};

const logout = async (req, res) => {
  const user = await services.logout(req.user);
  res.status(204).json(user);
};

const current = async (req, res) => {
  const { _id } = req.user;
  const { email, subscription } = await services.currentUser(_id);

  res.status(200).json({ email, subscription });
};

module.exports = {
  signUp,
  login,
  logout,
  current,
};
