import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Message is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is not configured");
      return NextResponse.json(
        {
          error:
            "OpenAI API key not configured. Please add your API key to environment variables.",
        },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Adrian Assistant AI, a helpful and knowledgeable AI assistant. Respond in a friendly, professional manner. Keep responses concise but informative.",
        },
        {
          role: "user",
          content: message.trim(),
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const reply = response.choices[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { error: "No response generated from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json(
          { error: "Invalid OpenAI API key" },
          { status: 401 }
        );
      }
      if (error.message.includes("quota")) {
        return NextResponse.json(
          { error: "OpenAI API quota exceeded" },
          { status: 429 }
        );
      }
    }
    return NextResponse.json(
      {
        error:
          "An error occurred while processing your request. Please try again.",
      },
      { status: 500 }
    );
  }
}
