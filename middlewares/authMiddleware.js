/**
 *  1. Извлекаем из заголовка 'authorization'.
 *  2. Делим 'authorization' на 'tokenType' и 'token'.
 *  3. Проверям 'tokenType === "Bearer"' и наличие 'token'.
 *  4. Декодируем с помощью 'token' и 'JWT_secret' в 'decodedUser'.
 *  5. Проверяем по 'decodedUser._id' наличие в базе декодированного user.
 *  6. Если 'user' в базе найден, и у него есть 'token' (проверяем это),
 *     прикрепляем 'user' и 'token' к объекту запроса (записываем  в 'req'),
 *     "пробрасывая" таким образом для дальнейшего использования в контроллерах.
 */
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { requestError } = require("../helpers/apiHelpers");
const { User } = require("../models");

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [tokenType, token] = authorization.split(" ");

  if (!(tokenType === "Bearer" && token)) {
    next(requestError(401, "Not authorized"));
  }

  const { JWT_SECRET: secret } = process.env;

  try {
    const decodedUser = jwt.verify(token, secret);
    const user = await User.findById(decodedUser._id);

    if (!user || !user.token) {
      next(requestError(401, "Not authorized"));
    }

    req.user = user; // pass 'user' to next middlewares
    req.token = token; // pass 'token' to next middlewares

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      error.status = 401;
      error.message = "Not authorized";
    }
    next(error);
  }
};

module.exports = authMiddleware;
