import mongoose, { Schema, Document } from "mongoose";

// Define Product Interface
export interface IProduct extends Document {
  title: string;
  description: string;
  category: string;
  price: number;
  offerPrice: number;
  discount: number;
  images: string[];
}

// Define Product Schema
const ProductSchema: Schema<IProduct> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    images: { type: [String], required: true, validate: [(val: string[]) => val.length >= 1 && val.length <= 5, "Images should be between 1 and 5"] },
  },
  { timestamps: true }
);

// Export the model
const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
