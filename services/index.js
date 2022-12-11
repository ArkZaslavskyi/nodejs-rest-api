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
} = require("./userServices");

module.exports = {
  //
  signUp,
  login,
  logout,
  updateUserSubscriptionById,
  //
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
  updateStatusContactById,
};
