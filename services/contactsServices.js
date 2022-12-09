const { Contact } = require("../models");

const getContacts = async (userId) => {
  const contacts = await Contact.find({ owner: userId }).select({
    updatedAt: 0,
    owner: 0,
  });
  return contacts;
};

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).select({ updatedAt: 0, owner: 0 });
  return contact;
};

const addContact = async (body, userId) => {
  const contact = new Contact({ ...body, owner: userId });
  const postedContact = await contact.save();
  return postedContact;
};

const updateContactById = async (contactId, body, userId) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { $set: body },
    { returnDocument: "after" }
  );

  return contact;
};

const removeContactById = async (contactId, userId) => {
  const deletedContact = await Contact.findOneAndDelete({
    _id: contactId,
    owner: userId,
  });

  return deletedContact;
};

const updateStatusContactById = async (contactId, body, userId) => {
  return updateContactById(contactId, body, userId);
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
  updateStatusContactById,
};
