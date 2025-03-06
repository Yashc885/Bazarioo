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

    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, { expiresIn: "30d" });

    return NextResponse.json({
      message: "User registered successfully!",
      user: { email: newUser.email, name: newUser.name, _id: newUser._id },
      token, // Send token to frontend instead of setting cookies
    });

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
