import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request) {
    try {
        const { prompt, model } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const response = await ai.models.generateContent({ model: model || "gemini-3.6-flash", contents: prompt, });

        return NextResponse.json({ text: response.text, });
    } catch (error) {
        console.error("Gemini API Error:", error);

        return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
    }
}