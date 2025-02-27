import { NextResponse } from "next/server";
import dbConnect from "@/database/Config";
import Product from "@/models/Product";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  await dbConnect(); // Ensure DB connection

  try {
    const param = await context.params; // Await the params
    const id = await param.id; // Await the id extraction

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
