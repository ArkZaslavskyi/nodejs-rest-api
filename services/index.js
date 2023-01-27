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
  verification,
  resendingEmail,
  login,
  logout,
  updateUserSubscriptionById,
  patchUserAvatarById,
} = require("./userServices");

module.exports = {
  //
  signUp,
  verification,
  resendingEmail,
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
