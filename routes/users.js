const { Router } = require("express");

const ctrlUsers = require("../controllers/users");

const { asyncWrapper } = require("../helpers/apiHelpers");
const { validationBody, authMiddleware } = require("../middlewares");

const { schemaUser } = require("../schemes");

const router = new Router();

router.post(
  "/signup",
  validationBody(schemaUser),
  asyncWrapper(ctrlUsers.signUp)
);

router.post(
  "/login",
  validationBody(schemaUser),
  asyncWrapper(ctrlUsers.login)
);

router.get("/logout", authMiddleware, asyncWrapper(ctrlUsers.logout));

module.exports = router;
