import mongoose, { Schema, Document } from "mongoose";

// Define Contact Interface
export interface IContact extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

// Define Contact Schema
const ContactSchema: Schema<IContact> = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// Export the model
const Contact = mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);
export default Contact;
