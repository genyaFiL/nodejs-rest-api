import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Jimp from "jimp";
import gravatar from "gravatar";
import fs from "fs/promises";
import path from "path";

import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorator/index.js";
import User from "../models/User.js";

const { JWT_SECRET } = process.env;

const avatarsPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  console.log("newUser: ", newUser);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id, subscription } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: { email, subscription },
  });
};
const getCurrent = (req, res) => {
  const { subscription, email, avatarURL } = req.user;

  res.json({
    email,
    subscription,
    avatarURL,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "No Content",
  });
};

const updateAvatar = async (req, res) => {
  const { path: oldPath, filename } = req.file;

  const newPath = path.join(avatarsPath, filename);

  Jimp.read(oldPath, (err, img) => {
    if (err) throw err;
    img.resize(250, 250).write(newPath);
  });

  await fs.rename(oldPath, newPath);

  const avatarURL = path.join("avatars", filename);

  const { _id: owner } = req.user;

  const result = await User.findOneAndUpdate(
    owner,
    { avatarURL },
    {
      new: true,
    }
  );

  res.json(result);
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
