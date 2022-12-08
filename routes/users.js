const { Router } = require("express");

const ctrlUsers = require("../controllers/users");

const { asyncWrapper } = require("../helpers/apiHelpers");
const { validationBody, isValidId, authMiddleware } = require("../middlewares");

const { schemaUser, schemaUserSubscription } = require("../schemes");

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
router.get("/current", authMiddleware, asyncWrapper(ctrlUsers.current));
router.patch(
  "/:id",
  isValidId,
  validationBody(schemaUserSubscription),
  authMiddleware,
  asyncWrapper(ctrlUsers.patchUserSubscription)
);

module.exports = router;
