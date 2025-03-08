import { NextRequest, NextResponse } from "next/server";
import connect from "./../../../database/Config";
import Admin from "./../../../models/Admin"; // Ensure you have an Admin model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(req: NextRequest) {
  try {
    await connect();

    if (!SECRET_KEY) {
      console.error("SECRET_KEY is missing!");
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }

    const { email, password } = await req.json();

    // Find admin in the database
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Generate token
    const token = jwt.sign({ adminId: admin._id, role: "admin" }, SECRET_KEY, { expiresIn: "30d" });

    return NextResponse.json({
      message: "Admin login successful",
      admin: { email: admin.email, name: admin.name, _id: admin._id },
      token, // Send token to frontend
    });

  } catch (error) {
    console.error("Admin Login Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
