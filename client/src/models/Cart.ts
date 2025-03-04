import mongoose, { Schema, Document } from "mongoose";

// Define Cart Interface
export interface ICart extends Document {
  user: mongoose.Schema.Types.ObjectId;
  products: {
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
    status: "available" | "not available";
  }[];
}

// Define Cart Schema
const CartSchema: Schema<ICart> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, default: 1 },
        status: { type: String, enum: ["available", "not available"], default: "available" },
      },
    ],
  },
  { timestamps: true }
);

// Export the model
const Cart = mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
export default Cart;
