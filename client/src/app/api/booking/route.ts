/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connect from "../../../database/Config";
import Booking from "../../../models/Booking";
import User from "../../../models/User";
import Product from "../../../models/Product";

// POST: Create a new booking
export async function POST(req: NextRequest) {
  // ✅ 1. Connect to DB
  await connect();
  try {
    // ✅ 2. Parse request body
    const body = await req.json();
    const {
      userId,
      items,
      totalAmount,
      firstName,
      streetAddress,
      city,
      state,
      pincode,
      phone,
      email,
      transactionId,
    } = body;

    // ✅ 3. Validate user
    console.log("🔍 Checking userId:", userId);
    const user = await User.findById(userId);
    if (!user) {
      console.error(" User not found:", userId);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // ✅ 4. Validate and format items
    const formattedItems: any[] = [];

    for (const item of items) {
      if (!item.productId || !item.quantity || !item.price) {
        console.error(" Invalid item format:", item);
        return NextResponse.json({ message: "Invalid item format" }, { status: 400 });
      }

      const product = await Product.findById(item.productId);
      if (!product) {
        console.error(" Product not found:", item.productId);
        return NextResponse.json({ message: `Product not found: ${item.productId}` }, { status: 400 });
      }
      formattedItems.push({
        product: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    // ✅ 5. Build billingDetails object
    const billingDetails = {
      firstName: firstName || "",
      street: streetAddress || "",
      city: city || "",
      state: state || "",
      pincode: pincode || "",
      phone: phone || "",
      email: email || "",
    };
  
    // ✅ 6. Validate billing details fields
    for (const key in billingDetails) {
      if (!billingDetails[key as keyof typeof billingDetails]) {
        console.error(` Missing billingDetails field: ${key}`);
        return NextResponse.json({ message: `Missing field in billingDetails: ${key}` }, { status: 400 });
      }
    }

    const bookingId = `BOOK-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    // ✅ 7. Create Booking Document
    const booking = new Booking({
      bookingId,
      user: userId,
      items: formattedItems,
      totalAmount,
      paymentStatus: transactionId ? "paid" : "pending",
      transactionId,
      billingDetails,
    });

    // ✅ 8. Save Booking
    await booking.save();
    // ✅ 9. Return response
    return NextResponse.json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error: any) {
    console.error(" Booking Creation Error:", error.message || error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error?.message || error,
      },
      { status: 500 }
    );
  }
}
