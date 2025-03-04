import { NextRequest, NextResponse } from "next/server";
import connect from "./../../../database/Config"; 
import Cart from "./../../../models/Cart";
import User from "./../../../models/User";
import Product from "./../../../models/Product";

// POST: Add multiple products to cart
export async function POST(req: NextRequest) {
  await connect();
  try {
    const { userId, products } = await req.json(); // products is an array of { productId, quantity }

    // Validate user
    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Find or create cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, products: [] });

    for (const { productId, quantity } of products) {
      // Validate product
      const product = await Product.findById(productId);
      const status = product ? "available" : "not available";

      // Check if product already exists in cart
      const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
        cart.products[productIndex].status = status;
      } else {
        cart.products.push({ product: productId, quantity, status });
      }
    }

    await cart.save();
    return NextResponse.json({ message: "Cart updated successfully", cart });
  } catch (error) {
    console.error("Cart Update Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// GET: Fetch user's cart
export async function GET(req: NextRequest) {
  await connect();
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) return NextResponse.json({ message: "User ID is required" }, { status: 400 });

    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Fetch Cart Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// PUT: Update multiple products in cart
export async function PUT(req: NextRequest) {
  await connect();
  try {
    const { userId, products } = await req.json(); // products is an array of { productId, quantity }

    if (!userId || !products || !Array.isArray(products)) return NextResponse.json({ message: "Missing or invalid parameters" }, { status: 400 });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

    for (const { productId, quantity } of products) {
      const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
      if (productIndex === -1) continue;
      cart.products[productIndex].quantity = quantity;
    }
    
    await cart.save();
    return NextResponse.json({ message: "Cart updated successfully", cart });
  } catch (error) {
    console.error("Update Cart Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Remove multiple products from cart
export async function DELETE(req: NextRequest) {
  await connect();
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const productIds = searchParams.getAll("productId"); // Accept multiple product IDs

    if (!userId || !productIds.length) return NextResponse.json({ message: "User ID and at least one Product ID are required" }, { status: 400 });
    
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    
    cart.products = cart.products.filter((p) => !productIds.includes(p.product.toString()));
    await cart.save();
    return NextResponse.json({ message: "Products removed from cart", cart });
  } catch (error) {
    console.error("Delete Cart Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}