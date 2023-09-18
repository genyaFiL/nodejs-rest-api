import schemas from "../../schemas/user-schemas.js";

import { validateBody } from "../../decorator/index.js";

const userSignupValidate = validateBody(schemas.userSignupSchema);

const userSigninValidate = validateBody(schemas.userSigninSchema);

export default {
  userSignupValidate,
  userSigninValidate,
};
