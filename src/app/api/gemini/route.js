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

        const targetModel = model || "gemini-2.5-flash";

        const response = await ai.models.generateContent({
            model: targetModel,
            contents: prompt,
        });

        return NextResponse.json({ text: response.text });
    } catch (error) {
        console.error("Gemini API Error:", error);

        const errorStr = String(error?.message || error || "");
        const isQuota =
            error?.status === 429 ||
            errorStr.includes("429") ||
            errorStr.includes("quota") ||
            errorStr.includes("Quota") ||
            errorStr.includes("RESOURCE_EXHAUSTED") ||
            errorStr.includes("rate");

        if (isQuota) {
            return NextResponse.json(
                { error: "AI Quota Reached. Please wait 30 seconds." },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: error?.message || "Failed to generate response" },
            { status: 500 }
        );
    }
}