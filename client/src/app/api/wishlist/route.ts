/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connect from "./../../../database/Config";
import Wishlist from "./../../../models/Wishlist";
import User from "./../../../models/User";
import Product from "./../../../models/Product";

// POST: Add multiple products to wishlist
export async function POST(req: NextRequest) {
  await connect();
  try {
    const { userId, products } = await req.json(); // products is an array of productId

    // Validate user
    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Find or create wishlist
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) wishlist = new Wishlist({ user: userId, products: [] });

    for (const productId of products) {
      // Validate product
      const product = await Product.findById(productId);
      if (!product) continue;

      // Check if product already exists in wishlist
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();
    return NextResponse.json({ message: "Wishlist updated successfully", wishlist });
  } catch (error) {
    console.error("Wishlist Update Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// GET: Fetch user's wishlist
export async function GET(req: NextRequest) {
  await connect();
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) return NextResponse.json({ message: "User ID is required" }, { status: 400 });

    const wishlist = await Wishlist.findOne({ user: userId }).populate("products");
    if (!wishlist) return NextResponse.json({ message: "Wishlist not found" }, { status: 404 });

    return NextResponse.json({ wishlist });
  } catch (error) {
    console.error("Fetch Wishlist Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Remove multiple products from wishlist
export async function DELETE(req: NextRequest) {
  await connect();
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const productIds = searchParams.getAll("productId"); // Accept multiple product IDs

    if (!userId || !productIds.length) return NextResponse.json({ message: "User ID and at least one Product ID are required" }, { status: 400 });
    
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) return NextResponse.json({ message: "Wishlist not found" }, { status: 404 });
    
    wishlist.products = wishlist.products.filter((p: any) => !productIds.includes(p.toString()));
    await wishlist.save();
    return NextResponse.json({ message: "Products removed from wishlist", wishlist });
  } catch (error) {
    console.error("Delete Wishlist Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
