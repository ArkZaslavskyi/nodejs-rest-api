const services = require("../services");
const { requestError } = require("../helpers/apiHelpers");

const getContacts = async (req, res) => {
  const { _id: userId } = req.user;
  const { page = 1, limit = 10 } = req.query;

  const contacts = await services.getContacts(userId, { page, limit });

  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await services.getContactById(contactId, userId);

  if (!contact) {
    throw requestError(404, `Not found contact with id: ${contactId}`);
  }

  return res.status(200).json(contact);
};

const postContact = async (req, res) => {
  const { body } = req;
  const { _id: userId } = req.user;

  const postedContact = await services.addContact(body, userId);

  res.status(201).json(postedContact);
};

const putContact = async (req, res) => {
  const { body } = req;
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await services.updateContactById(contactId, body, userId);

  if (!contact) {
    throw requestError(404, `Not found contact with id: ${contactId}`);
  }

  return res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;

  const deletedContact = await services.removeContactById(contactId, userId);

  if (!deletedContact) {
    throw requestError(404, `Not found contact with id: ${contactId}`);
  }

  return res
    .status(200)
    .json({ message: `contact with id: ${contactId} was deleted` });
};

const patchContactStatus = async (req, res) => {
  const { body } = req;
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await services.updateStatusContactById(
    contactId,
    body,
    userId
  );

  if (!contact) {
    throw requestError(404, `Not found contact with id: ${contactId}`);
  }

  return res.status(200).json(contact);
};

module.exports = {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
  patchContactStatus,
};
