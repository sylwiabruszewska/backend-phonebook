import { model, Schema } from "mongoose";

const contactSchema = Schema(
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

const Contact = model("contact", contactSchema);

export default Contact;
