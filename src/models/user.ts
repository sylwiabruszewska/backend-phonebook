import { Document, model, Schema, Model } from "mongoose";
import bCrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  token: string;
  verify: boolean;
  verificationToken: string;
  setPassword(password: string): Promise<void>;
  validPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

userSchema.methods.setPassword = async function (password: string) {
  const salt = await bCrypt.genSalt(10);
  const hashedPassword = await bCrypt.hash(password, salt);
  this.password = hashedPassword;
};

userSchema.methods.validPassword = async function (password: string) {
  return await bCrypt.compare(password, this.password);
};

export const User: Model<IUser> = model<IUser>("User", userSchema);
