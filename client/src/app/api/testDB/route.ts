import { NextResponse } from "next/server";
import connect from "./../../../database/Config";  

export async function GET() {
    try {
        await connect();
        console.log(" Database check successful.");
        return NextResponse.json({ message: "Database connected successfully!" });
    } catch (error) {
        console.error(" Database check failed:", error);
        return NextResponse.json({ message: "Database connection failed!" }, { status: 500 });
    }
}
