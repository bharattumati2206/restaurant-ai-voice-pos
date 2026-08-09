"use client";

import { createRecognition } from "./SpeechRecognizer";

import usePosStore from "@/store/usePosStore";

import { planCommand } from "@/agent/planner";
import { executePlan } from "@/agent/executor";

import speechService from "@/services/speechService";

const UNKNOWN_COMMAND_RESPONSES = [
  "Sorry, I couldn't hear that properly. Could you please say that again?",
  "I'm sorry, I didn't quite catch that. Could you repeat your command?",
  "Pardon me, I didn't get that clearly. Please try saying it again.",
  "Sorry about that, I didn't understand the request. Could you say it once more?",
  "My apologies, I missed that. Could you please repeat what you would like to order?",
  "I didn't quite catch that request. Could you please say it one more time?",
  "Sorry, I didn't hear you clearly. Could you say that again for me?",
];

export default function useVoice() {
  const setListening = usePosStore((s) => s.setListening);
  const setTranscript = usePosStore((s) => s.setTranscript);
  const addTimeline = usePosStore((s) => s.addTimeline);
  const setAiConsoleOpen = usePosStore((s) => s.setAiConsoleOpen);

  const startListening = () => {
    const isSpeaking = usePosStore.getState().isSpeaking;
    if (isSpeaking) {
      // Don't start listening if AI is currently speaking
      return;
    }

    const recognition = createRecognition();

    if (!recognition) {
      addTimeline(
        "Speech Recognition is not supported in this browser.",
        "error",
      );
      return;
    }

    setListening(true);

    addTimeline("🎤 Listening...", "thinking");

    recognition.start();

    recognition.onresult = async (event) => {
      try {
        const transcript = event.results[0][0].transcript;

        setTranscript(transcript);

        addTimeline(`Heard: "${transcript}"`, "success");

        addTimeline("🧠 AI Processing...", "thinking");

        const setIsAiProcessing = usePosStore.getState().setIsAiProcessing;
        setIsAiProcessing(true);

        let plan;
        try {
          plan = await planCommand(transcript);
        } finally {
          setIsAiProcessing(false);
        }

        if (!plan.steps.length) {
          const randomClarification =
            UNKNOWN_COMMAND_RESPONSES[
              Math.floor(Math.random() * UNKNOWN_COMMAND_RESPONSES.length)
            ];

          addTimeline(`⚠️ ${randomClarification}`, "error");
          speechService.say(randomClarification);
          return;
        }

        addTimeline(`Generated ${plan.steps.length} step(s).`, "info");

        await executePlan(plan);

        addTimeline("✅ Command completed.", "success");
      } catch (error) {
        console.error("Voice processing error:", error);

        const msg = String(error?.message || error || "");
        if (
          msg.includes("Quota") ||
          msg.includes("429") ||
          msg.includes("quota") ||
          msg.includes("RESOURCE_EXHAUSTED")
        ) {
          addTimeline(
            "⚠️ AI Quota Reached. Please wait 30 seconds before retrying.",
            "error",
          );
          speechService.say(
            "Sorry, the AI service quota was reached. Please wait a moment before trying again.",
          );
        } else {
          addTimeline(`❌ ${msg || "Failed to process command."}`, "error");
          speechService.say(
            "Sorry, I encountered an issue processing your request.",
          );
        }
      }
    };

    recognition.onerror = (event) => {
      console.error(event);

      const randomClarification =
        UNKNOWN_COMMAND_RESPONSES[
          Math.floor(Math.random() * UNKNOWN_COMMAND_RESPONSES.length)
        ];

      addTimeline(`⚠️ ${randomClarification}`, "error");
      speechService.say(randomClarification);

      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return {
    startListening,
  };
}
