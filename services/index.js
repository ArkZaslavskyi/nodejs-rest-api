const {
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
  updateStatusContactById,
} = require("./contactsServices");

const { signUp, login, logout } = require("./userServices");

module.exports = {
  //
  signUp,
  login,
  logout,
  //
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
  updateStatusContactById,
};
