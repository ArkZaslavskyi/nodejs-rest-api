const { Router } = require("express");

const ctrlContacts = require("../../controllers/contacts");

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

router.get("/", asyncWrapper(ctrlContacts.getContacts));
router.get("/:id", isValidId, asyncWrapper(ctrlContacts.getContactById));
router.post(
  "/",
  validationBody(schemaPostContact),
  asyncWrapper(ctrlContacts.postContact)
);
router.put(
  "/:id",
  isValidId,
  validationBody(schemaPutContact),
  asyncWrapper(ctrlContacts.putContact)
);
router.delete("/:id", isValidId, asyncWrapper(ctrlContacts.deleteContact));
router.patch(
  "/:id/favorite",
  isValidId,
  validationBody(schemaPatchContactStatus),
  asyncWrapper(ctrlContacts.patchContactStatus)
);

module.exports = router;
