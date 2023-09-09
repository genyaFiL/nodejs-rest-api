import contactsService from "../models/contacts.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorator/index.js";

const getAll = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  // const { error } = contactAddSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.message);
  // }
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  // const { error } = contactPutSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.message);
  // }

  const { id } = req.params;
  const { ...data } = req.body;

  const contactForUpdate = await contactsService.getContactById(id);
  if (!contactForUpdate) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  const updateContact = { ...contactForUpdate, ...data };

  const result = await contactsService.updateContact(id, updateContact);

  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    message: "Contact deleted",
  });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
