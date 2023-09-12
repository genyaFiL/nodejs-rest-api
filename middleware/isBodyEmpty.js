import { HttpError } from "../helpers/index.js";

const isBodyEmpty = (req, res, next) => {
  console.log("req.body: ", Object.keys(req.body).length);

  if (Object.keys(req.body).length === 0) {
    return next(HttpError(400, `missing field favorite`));
  }
  next();
};

export default isBodyEmpty;
