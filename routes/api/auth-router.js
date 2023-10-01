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

authRouter.get("/verify/:verificationToken", authControllers.verify);

authRouter.post(
  "/verify",
  usersValidations.userEmailValidate,
  authControllers.resendVerifyEmail
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

  authenticate,
  upload.single("file"),
  authControllers.updateAvatar
);

export default authRouter;
