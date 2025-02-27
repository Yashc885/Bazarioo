import { NextRequest, NextResponse } from "next/server";
import connect from "../../../database/Config"; // Ensure correct path
import Product from "../../../models/Product";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req: NextRequest) {
  await connect(); // Ensure MongoDB is connected

  try {
    const { title, description, category, price, offerPrice, discount, images } = await req.json();

    // Validate required fields
    if (!title || !description || !category || !price || !offerPrice || !discount || !images || images.length < 1 || images.length > 5) {
      return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
    }

    // Create a new product
    const product = new Product({
      title,
      description,
      category,
      price,
      offerPrice,
      discount,
      images,
    });

    await product.save();

    return NextResponse.json({ message: "Product created successfully", product }, { status: 201 });
  } catch (error) {
    console.error("Product Creation Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  await connect();

  try {
    const products = await Product.find();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await connect();

  try {
    const { id, ...updateData } = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated successfully", updatedProduct }, { status: 200 });
  } catch (error) {
    console.error("Product Update Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await connect();

  try {
    const { id } = await req.json();

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Product Deletion Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}