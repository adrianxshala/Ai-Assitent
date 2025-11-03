// src/app/api/message/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/types/message";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { message, role = "user" } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    if (!["user", "assistant"].includes(role)) {
      return NextResponse.json(
        { error: "Role must be either 'user' or 'assistant'" },
        { status: 400 }
      );
    }

    // Insert message into Supabase
    const { data, error } = await supabase
      .from("messages")
      .insert({
        content: message.trim(),
        role: role,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save message to database" },
        { status: 500 }
      );
    }

    const newMessage: Message = {
      id: data.id,
      content: data.content,
      created_at: data.created_at,
      role: data.role as "user" | "assistant",
    };

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
    // Fetch messages from Supabase, ordered by created_at descending
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Supabase select error:", error);
      return NextResponse.json(
        { error: "Failed to fetch messages from database" },
        { status: 500 }
      );
    }

    const messages: Message[] = (data || []).map((msg) => ({
      id: msg.id,
      content: msg.content,
      created_at: msg.created_at,
      role: msg.role as "user" | "assistant",
    }));

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Messages GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
