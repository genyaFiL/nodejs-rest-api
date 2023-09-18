import express from "express";

import usersValidations from "../../middleware/validation/users-validations.js";
import authControllers from "../../controllers/auth-controllers.js";
import authenticate from "../../middleware/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  usersValidations.userSignupValidate,
  authControllers.signup
);

authRouter.post(
  "/signin",
  usersValidations.userSignupValidate,
  authControllers.signin
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/signout", authenticate, authControllers.signout);

export default authRouter;
