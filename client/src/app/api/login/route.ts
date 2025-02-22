import { NextRequest, NextResponse } from "next/server";
import  connect  from "./../../../database/Config"; // Adjust path
import User from "./../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  await connect(); // Ensure MongoDB is connected

  try {
    const { email, password } = await req.json();
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
    return NextResponse.json({ message: "Login successful", user: { email: user.email, name: user.name } });
    console.log("Logged In")

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
