const jwt = require("jsonwebtoken");
require("dotenv").config();
const { requestError } = require("../helpers/apiHelpers");

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(requestError(401, "Not authorized"));
  }

  const [tokenType, token] = authorization.split(" ");

  if (!(tokenType === "Bearer" && token)) {
    next(requestError(401, "Not authorized"));
  }

  const { JWT_SECRET: secret } = process.env;

  try {
    const user = jwt.decode(token, secret);
    req.user = user; // pass 'user' to next middlewares
    req.token = token; // pass 'token' to next middlewares
    next();
  } catch (error) {
    next(requestError(401, "Not authorized"));
  }
};

module.exports = authMiddleware;
