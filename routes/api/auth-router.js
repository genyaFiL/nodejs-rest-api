import express from "express";

import usersValidations from "../../middleware/validation/users-validations.js";
import authControllers from "../../controllers/auth-controllers.js";
import authenticate from "../../middleware/authenticate.js";
import upload from "../../middleware/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  usersValidations.userSignupValidate,
  authControllers.signup
);

authRouter.post(
  "/signin",
  usersValidations.userSigninValidate,
  authControllers.signin
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/signout", authenticate, authControllers.signout);

authRouter.patch(
  "/avatars",
  // isValidId,
  // isBodyEmpty,
  authenticate,
  upload.single("file"),
  authControllers.updateAvatar
  // contactsValidation.updateFavoriteSchema,
  // controller.updateById
);

export default authRouter;
