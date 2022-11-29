const { Schema, model } = require("mongoose");
const handleSchemeValidationError = require("./handleSchemeValidationError");

const userScheme = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userScheme.post("save", handleSchemeValidationError);

const User = model("user", userScheme);

module.exports = User;
