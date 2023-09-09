import schemas from "../../schemas/schemas.js";

import { validateBody } from "../../decorator/index.js";

const addContactsValidate = validateBody(schemas.contactAddSchema);

const putContactsValidate = validateBody(schemas.contactPutSchema);

export default {
  addContactsValidate,
  putContactsValidate,
};
