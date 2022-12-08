const {
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
  updateStatusContactById,
} = require("./contactsServices");

const { signUp, login, logout, currentUser } = require("./userServices");

module.exports = {
  //
  signUp,
  login,
  logout,
  currentUser,
  //
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
  updateStatusContactById,
};
