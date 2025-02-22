import { NextRequest, NextResponse } from "next/server";
import  connect  from "./../../../database/Config"; // Adjust path
import User from "./../../../models/User";

export async function POST(req: NextRequest) {
  await connect(); // Ensure MongoDB is connected

  try {
    const { name, email, password } = await req.json();
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(" User already exists!");
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Create new user and save
    const newUser = new User({ name, email, password });
    await newUser.save();
    return NextResponse.json({ message: "User registered successfully!" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
