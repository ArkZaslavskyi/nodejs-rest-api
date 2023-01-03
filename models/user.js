const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
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

userScheme.pre("save", async function () {
  if (this.$isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userScheme.post("save", handleSchemeValidationError);

const User = model("user", userScheme);

module.exports = User;
