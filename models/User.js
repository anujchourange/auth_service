const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: "String",
    required: true,
    unique: true,
    minlength: 4,
    maxLength: 100,
  },
  full_name: {
    type: "String",
    required: true,
    unique: true,
    minlength: 4,
    maxLength: 100,
  },
  email: {
    type: "String",
    required: true,
    unique: true,
    maxLength: 100,
  },
  password: {
    type: "String",
    required: true,
    minlength: 8,
    maxLength: 100,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    next(error);
  }
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
