const jwt = require("jsonwebtoken");
require("dotenv").config();
const { requestError } = require("../helpers/apiHelpers");

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(requestError(401, "Not authorized"));
  }

  const [, token] = authorization.split(" ");

  if (!token) {
    next(requestError(401, "Not authorized"));
  }

  const { JWT_SECRET: secret } = process.env;

  try {
    const user = jwt.decode(token, secret);
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(requestError(401, "Not authorized"));
  }
};

module.exports = authMiddleware;
