import express from "express";

import controller from "../../controllers/controller.js";

import contactsValidation from "../../middleware/validation/validation.js";
import { isValidId, isBodyEmpty } from "../../middleware/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", controller.getAll);

contactsRouter.get("/:id", isValidId, controller.getById);

contactsRouter.post(
  "/",
  contactsValidation.addContactsValidate,
  controller.add
);

contactsRouter.put(
  "/:id",
  isValidId,
  contactsValidation.addContactsValidate,
  controller.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isBodyEmpty,
  contactsValidation.updateFavoriteSchema,
  controller.updateById
);

contactsRouter.delete("/:id", isValidId, controller.deleteById);

export default contactsRouter;
