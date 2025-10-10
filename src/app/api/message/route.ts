// src/app/api/message/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/types/message";

// Simple in-memory storage for demo purposes
// In production, you'd want to use a proper database
let messages: Message[] = [];

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Create a simple message object
    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      created_at: new Date().toISOString(),
      role: "user",
    };

    // Add to in-memory storage
    messages.unshift(newMessage);

    // Keep only last 50 messages to prevent memory issues
    if (messages.length > 50) {
      messages = messages.slice(0, 50);
    }

    return NextResponse.json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.error("Message API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return messages from in-memory storage
    return NextResponse.json({ messages: messages });
  } catch (error) {
    console.error("Messages GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
