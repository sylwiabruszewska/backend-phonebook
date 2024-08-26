import { Document, model, Schema, Model } from "mongoose";

interface IContact extends Document {
  name: string;
  email?: string;
  phone: string;
  favorite?: boolean;
  owner?: Schema.Types.ObjectId;
  createdAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Set phone number for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false, timestamps: false }
);

contactSchema.index({ name: "text" });

const Contact: Model<IContact> = model<IContact>("contact", contactSchema);

export default Contact;
