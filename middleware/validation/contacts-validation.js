import schemas from "../../schemas/contact-schemas.js";

import { validateBody } from "../../decorator/index.js";

const addContactsValidate = validateBody(schemas.contactAddSchema);

const updateFavoriteSchema = validateBody(schemas.contactUpdateFavoriteSchema);

export default {
  addContactsValidate,
  updateFavoriteSchema,
};
