import { NextRequest, NextResponse } from "next/server";
import connect from "./../../../database/Config";
import User from "./../../../models/User";
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

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "30d" });

    return NextResponse.json({
      message: "Login successful",
      user: { email: user.email, name: user.name, _id: user._id },
      token, // Send token to frontend instead of setting cookies
    });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
