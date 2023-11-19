import { model, Schema } from "mongoose";
import bCrypt from "bcryptjs";

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
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
});

userSchema.methods.setPassword = async function (password) {
  const salt = await bCrypt.genSalt(10);
  const hashedPassword = await bCrypt.hash(password, salt);
  this.password = hashedPassword;
};

userSchema.methods.validPassword = async function (password) {
  return await bCrypt.compare(password, this.password);
};

const User = model("user", userSchema);
export default User;
