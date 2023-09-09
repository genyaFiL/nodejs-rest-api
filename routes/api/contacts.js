import express from "express";

import controller from "../../controllers/controller.js";

import contactsValidation from "../../middleware/validation/validation.js";

const contactsRouter = express.Router();

contactsRouter.get("/", controller.getAll);

contactsRouter.get("/:id", controller.getById);

contactsRouter.post(
  "/",
  contactsValidation.addContactsValidate,
  controller.add
);

contactsRouter.put(
  "/:id",
  contactsValidation.putContactsValidate,
  controller.updateById
);

contactsRouter.delete("/:id", controller.deleteById);

export default contactsRouter;
