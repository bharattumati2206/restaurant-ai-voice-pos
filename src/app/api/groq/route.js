import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Groq models in order of preference (fallback chain)
const GROQ_MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-70b-versatile",
  "llama-3.1-8b-instant",
  "gemma2-9b-it",
  "mixtral-8x7b-32768",
];

export async function POST(request) {
  try {
    const { prompt, model } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });

    // If a specific model is requested, try it first
    const modelsToTry = model
      ? [model, ...GROQ_MODELS.filter((m) => m !== model)]
      : GROQ_MODELS;

    let lastError = null;

    for (const currentModel of modelsToTry) {
      try {
        const completion = await groq.chat.completions.create({
          model: currentModel,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        });

        console.log(`Groq request successful with model: ${currentModel}`);

        return NextResponse.json({
          text: completion.choices[0].message.content,
          model: currentModel,
        });
      } catch (error) {
        console.warn(`Groq model ${currentModel} error:`, error.message);
        lastError = error.message;
        continue; // Try next model
      }
    }

    // All models failed
    return NextResponse.json(
      { error: lastError || "All Groq models failed" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate response" },
      { status: 500 }
    );
  }
}
