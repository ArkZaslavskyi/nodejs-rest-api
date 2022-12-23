const { Contact } = require("../models");

const getContacts = async (userId, { page, limit, favorite }) => {
  const findRules = { owner: userId };
  if (favorite && ["true", "false"].includes(favorite)) {
    findRules.favorite = favorite === "true";
  }

  const contacts = await Contact.find(findRules)
    .select({
      createdAt: 0,
      updatedAt: 0,
      owner: 0,
    })
    .skip((page - 1) * limit)
    .limit(parseInt(limit)); // .populate("owner", "email subscription");
  return contacts;
};

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).select({ createdAt: 0, updatedAt: 0, owner: 0 });
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
