import mongoose, { Schema, Document } from "mongoose";

// Define Booking Interface
export interface IBooking extends Document {
  user: mongoose.Schema.Types.ObjectId;
  items: {
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
    price: number;
    status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  }[];
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed";
  transactionId?: string;
}

// Define Booking Schema
const BookingSchema: Schema<IBooking> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
        status: {
          type: String,
          enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
          default: "pending",
        },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    transactionId: { type: String },
  },
  { timestamps: true }
);

// Export the model
const Booking = mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
export default Booking;
