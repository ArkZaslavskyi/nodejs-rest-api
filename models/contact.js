const { Schema, SchemaTypes, model } = require("mongoose");
const handleSchemeValidationError = require("./handleSchemeValidationError");

const phoneRegExp = /^\(\d{3}\)\s?\d{3}-\d{4}$/;

const contactScheme = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      match: phoneRegExp,
      required: [true, "Phone number is required"],
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactScheme.post("save", handleSchemeValidationError);

const Contact = model("contact", contactScheme);

module.exports = Contact;
