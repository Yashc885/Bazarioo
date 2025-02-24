import { NextRequest, NextResponse } from "next/server";
import connect from "./../../../database/Config"; // Ensure correct path
import User from "./../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string; // Ensure SECRET_KEY is loaded

export async function POST(req: NextRequest) {
  await connect(); // Ensure MongoDB is connected

  try {
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user and save
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT Token (expires in 30 days)
    const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, { expiresIn: "30d" });

    // Set Cookie with the Token
    const response = NextResponse.json({
      message: "User registered successfully!",
      user: { email: newUser.email, name: newUser.name, _id: newUser._id },
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
    console.error("Registration Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
