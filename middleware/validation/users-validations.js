import schemas from "../../schemas/user-schemas.js";

import { validateBody } from "../../decorator/index.js";

const userSignupValidate = validateBody(schemas.userSignupSchema);

const userSigninValidate = validateBody(schemas.userSigninSchema);

const userEmailValidate = validateBody(schemas.userEmailSchema);

export default {
  userSignupValidate,
  userSigninValidate,
  userEmailValidate,
};
