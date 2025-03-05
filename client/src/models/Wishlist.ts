import mongoose, { Schema, Document } from "mongoose";

// Define Wishlist Interface
export interface IWishlist extends Document {
  user: mongoose.Schema.Types.ObjectId;
  products: mongoose.Schema.Types.ObjectId[];
}

// Define Wishlist Schema
const WishlistSchema: Schema<IWishlist> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

// Export the model
const Wishlist = mongoose.models.Wishlist || mongoose.model<IWishlist>("Wishlist", WishlistSchema);
export default Wishlist;
