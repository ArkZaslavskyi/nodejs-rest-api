const {
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
  updateStatusContactById,
} = require("./contactsServices");

const {
  signUp,
  login,
  logout,
  updateUserSubscriptionById,
  patchUserAvatarById,
} = require("./userServices");

module.exports = {
  //
  signUp,
  login,
  logout,
  updateUserSubscriptionById,
  patchUserAvatarById,
  //
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
  updateStatusContactById,
};
