import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorator/index.js";
import Contact from "../models/Contact.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, ...query } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    { owner, ...query },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "password email");
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOne({ _id: id, owner: req.user._id });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: req.user._id },
    req.body,
    {
      new: true,
    }
  );

  res.json(result);
};
const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: req.user._id },
    req.body,
    {
      new: true,
    }
  );

  res.json(result);
};
const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOneAndDelete({
    _id: id,
    owner: req.user._id,
  });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteById: ctrlWrapper(deleteById),
};
