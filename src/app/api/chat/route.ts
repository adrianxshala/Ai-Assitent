import { NextResponse } from "next/server";
import OpenAI from "openai";
import { personalInfo } from "@/config/personal-info";

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

    if (!process.env.GROQ_API_KEY) {
      console.error("Groq API key is not configured");
      return NextResponse.json(
        {
          error:
            "Groq API key not configured. Please add your API key to environment variables.",
        },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    // Create personalized system prompt
    const systemPrompt = `You are ${
      personalInfo.name
    }'s AI Portfolio Assistant, representing ${personalInfo.name} as an ${
      personalInfo.title
    }.

${personalInfo.bio}

**Key Skills & Expertise:**
${personalInfo.skills.map((skill) => `- ${skill}`).join("\n")}

**Specialties:**
${personalInfo.specialties.map((specialty) => `- ${specialty}`).join("\n")}

**Your Role:**
- Act as a professional portfolio assistant representing ${personalInfo.name}
- Provide accurate information about ${
      personalInfo.name
    }'s skills, experience, and capabilities
- Help visitors understand what ${personalInfo.name} can do for them
- Answer questions about projects, technologies, and services
- ${personalInfo.personality}
- Be conversational but professional
- If asked about something outside your knowledge, politely redirect to relevant skills or offer to help in another way

Remember: You are representing ${
      personalInfo.name
    }'s professional portfolio. Be helpful, accurate, and showcase expertise while maintaining a friendly and approachable tone.`;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message.trim(),
        },
      ],
      max_tokens: 1500,
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
          { error: "Invalid Groq API key" },
          { status: 401 }
        );
      }
      if (error.message.includes("quota")) {
        return NextResponse.json(
          { error: "Groq API quota exceeded" },
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
