const { Router } = require("express");

const ctrl = require("../controllers");

const { asyncWrapper } = require("../helpers/apiHelpers");
const { validationBody, isValidId, authMiddleware } = require("../middlewares");

const { schemaUser, schemaUserSubscription } = require("../schemes");

const router = new Router();

router.post("/signup", validationBody(schemaUser), asyncWrapper(ctrl.signUp));
router.post("/login", validationBody(schemaUser), asyncWrapper(ctrl.login));
router.get("/logout", authMiddleware, asyncWrapper(ctrl.logout));
router.get("/current", authMiddleware, asyncWrapper(ctrl.current));
router.patch(
  "/:id",
  isValidId,
  validationBody(schemaUserSubscription),
  authMiddleware,
  asyncWrapper(ctrl.patchUserSubscription)
);

module.exports = router;
