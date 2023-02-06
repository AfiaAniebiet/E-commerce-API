const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide your full name."],
    },
    email: {
      type: String,
      required: [true, "Please provide an email."],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email.",
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enums: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
