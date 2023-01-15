const services = require("../services");
const { requestError } = require("../helpers/apiHelpers");

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
  await services.logout(req.user);
  res.status(204).json();
};

const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

const patchUserSubscription = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const user = await services.updateUserSubscriptionById(id, body);

  if (!user) {
    throw requestError(404, `Not found contact with id: ${id}`);
  }

  const { email, subscription } = user;

  return res.status(200).json({ email, subscription });
};

const patchUserAvatar = async (req, res) => {
  const { _id: userId } = req.user;
  const { file } = req;

  try {
    const user = await services.patchUserAvatarById(userId, file);
    const { avatarURL } = user;

    res.status(200).json({ avatarURL });
  } catch (error) {}
};

module.exports = {
  signUp,
  login,
  logout,
  current,
  patchUserSubscription,
  patchUserAvatar,
};
