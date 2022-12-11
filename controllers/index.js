const {
  signUp,
  login,
  logout,
  patchUserSubscription,
  current,
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
  patchUserSubscription,
  current,
  //
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
  patchContactStatus,
};
