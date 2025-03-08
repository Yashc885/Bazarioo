/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connect from "../../../database/Config"; 
import Booking from "../../../models/Booking";
import User from "../../../models/User";
import Product from "../../../models/Product";

// POST: Create a new booking
export async function POST(req: NextRequest) {
    await connect();
    
    try {
      const body = await req.json();
      console.log("🔹 Incoming Booking Request:", body);
  
      const { userId, items, totalAmount, transactionId } = body;
  
      // Validate user
      const user = await User.findById(userId);
      if (!user) {
        console.error("❌ User not found:", userId);
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      console.log("✅ User found:", userId);
  
      // Validate and transform products
      const formattedItems = [];
  
      for (const item of items) {
        console.log("🔹 Checking item:", item);
  
        if (!item.productId) {
          console.error("❌ Missing productId in item:", item);
          return NextResponse.json({ message: "Invalid item format" }, { status: 400 });
        }
  
        const product = await Product.findById(item.productId);
        if (!product) {
          console.error("❌ Product not found:", item.productId);
          return NextResponse.json({ message: `Product not found: ${item.productId}` }, { status: 400 });
        }
        console.log("✅ Product found:", item.productId);
  
        // Rename productId → product (MongoDB schema requirement)
        formattedItems.push({
          product: item.productId,
          quantity: item.quantity,
          price: item.price,  // assuming price is needed
        });
      }
  
      // Create new booking
      const booking = new Booking({
        user: userId,
        items: formattedItems,  // Now items has `product`
        totalAmount,
        paymentStatus: transactionId ? "paid" : "pending",
        transactionId,
      });
  
      await booking.save();
      console.log("✅ Booking created successfully:", booking);
  
      return NextResponse.json({ message: "Booking created successfully", booking });
    } catch (error) {
      console.error("❌ Booking Creation Error:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }

// GET: Fetch user's bookings
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  await connect();
  try {
    // Fetch all orders without filtering by adminId
    const bookings = await Booking.find().populate("items.product");

    if (!bookings.length) {
      return NextResponse.json({ message: "No bookings found" }, { status: 404 });
    }

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Fetch Booking Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// PUT: Update booking status or payment
export async function PUT(req: NextRequest) {
  await connect();
  try {
    const { bookingId, status, paymentStatus, transactionId } = await req.json();

    if (!bookingId) return NextResponse.json({ message: "Booking ID is required" }, { status: 400 });

    const booking = await Booking.findById(bookingId);
    if (!booking) return NextResponse.json({ message: "Booking not found" }, { status: 404 });

    if (status) booking.items.forEach((item) => (item.status = status));
    if (paymentStatus) booking.paymentStatus = paymentStatus;
    if (transactionId) booking.transactionId = transactionId;

    await booking.save();
    return NextResponse.json({ message: "Booking updated successfully", booking });
  } catch (error) {
    console.error("Update Booking Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Cancel a booking
export async function DELETE(req: NextRequest) {
  await connect();
  try {
    const { searchParams } = new URL(req.url);
    const bookingId = searchParams.get("bookingId");

    if (!bookingId) return NextResponse.json({ message: "Booking ID is required" }, { status: 400 });

    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) return NextResponse.json({ message: "Booking not found" }, { status: 404 });

    return NextResponse.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Delete Booking Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
