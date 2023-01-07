const {
  signUp,
  login,
  logout,
  current,
  patchUserSubscription,
  patchUserAvatar,
} = require("./users");

const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
  patchContactStatus,
} = require("./contacts");

module.exports = {
  signUp,
  login,
  logout,
  current,
  patchUserSubscription,
  patchUserAvatar,
  //
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
  patchContactStatus,
};
