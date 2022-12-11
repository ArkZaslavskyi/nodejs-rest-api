const { Router } = require("express");

const ctrl = require("../../controllers");

const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  validationBody,
  isValidId,
  authMiddleware,
} = require("../../middlewares");

const {
  schemaPostContact,
  schemaPutContact,
  schemaPatchContactStatus,
} = require("../../schemes");

const router = new Router();

// check token
router.use(authMiddleware);

router.get("/", asyncWrapper(ctrl.getContacts));
router.get("/:id", isValidId, asyncWrapper(ctrl.getContactById));
router.post(
  "/",
  validationBody(schemaPostContact),
  asyncWrapper(ctrl.postContact)
);
router.put(
  "/:id",
  isValidId,
  validationBody(schemaPutContact),
  asyncWrapper(ctrl.putContact)
);
router.delete("/:id", isValidId, asyncWrapper(ctrl.deleteContact));
router.patch(
  "/:id/favorite",
  isValidId,
  validationBody(schemaPatchContactStatus),
  asyncWrapper(ctrl.patchContactStatus)
);

module.exports = router;
