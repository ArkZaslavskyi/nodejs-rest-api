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
  currentUser,
  updateUserSubscriptionById,
} = require("./userServices");

module.exports = {
  //
  signUp,
  login,
  logout,
  currentUser,
  updateUserSubscriptionById,
  //
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
  updateStatusContactById,
};
