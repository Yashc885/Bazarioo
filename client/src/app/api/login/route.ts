import { NextRequest, NextResponse } from "next/server";
import connect from "./../../../database/Config"; // Ensure correct path
import User from "./../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Load environment variables
import dotenv from "dotenv";
dotenv.config(); 

const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(req: NextRequest) {
  await connect(); // Ensure MongoDB is connected

  try {
    const { email, password } = await req.json();

    if (!SECRET_KEY) {
      console.error("SECRET_KEY is missing!");
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Generate JWT Token (expires in 30 days)
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "30d" });

    // Set Cookie with the Token
    const response = NextResponse.json({
      message: "Login successful",
      user: { email: user.email, name: user.name, _id: user._id },
      token,
    });

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
