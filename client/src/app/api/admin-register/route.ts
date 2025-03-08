import { NextRequest, NextResponse } from "next/server";
import connect from "./../../../database/Config";
import Admin from "./../../../models/Admin"; // Ensure you have an Admin model
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req: NextRequest) {
  try {
    await connect();

    const { name, email, password } = await req.json();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json({ message: "Admin already registered" }, { status: 400 });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: "admin", // Ensuring only admins use this API
    });

    await newAdmin.save();

    return NextResponse.json({ message: "Admin registered successfully" }, { status: 201 });

  } catch (error) {
    console.error("Admin Registration Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
