const {
  signUp,
  verification,
  resendingEmail,
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
  verification,
  resendingEmail,
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
