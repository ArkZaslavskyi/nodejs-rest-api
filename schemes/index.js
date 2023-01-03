const {
  schemaPostContact,
  schemaPutContact,
  schemaPatchContactStatus,
} = require("./schemesContact");

const { schemaUser, schemaUserSubscription } = require("./schemaUser");

module.exports = {
  schemaPostContact,
  schemaPutContact,
  schemaPatchContactStatus,
  schemaUser,
  schemaUserSubscription,
};
