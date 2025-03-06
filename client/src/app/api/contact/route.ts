import { NextRequest, NextResponse } from "next/server";
import connect from "../../../database/Config";
import Contact from "../../../models/Contact";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req) {
  try {
    await connect();

    const { name, email, phoneNumber, message, userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    if (!name || !email || !phoneNumber || !message) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newContact = new Contact({ userId, name, email, phoneNumber, message });
    await newContact.save();

    return NextResponse.json({
      message: "Message sent successfully!",
      contact: newContact,
    }, { status: 201 });

  } catch (error) {
    console.error("Contact Form Submission Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connect();
    const contacts = await Contact.find({});
    return NextResponse.json({ contacts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
