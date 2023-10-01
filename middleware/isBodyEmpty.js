import { HttpError } from "../helpers/index.js";

const isBodyEmpty = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(HttpError(400, `missing field favorite`));
  }
  next();
};

export default isBodyEmpty;
