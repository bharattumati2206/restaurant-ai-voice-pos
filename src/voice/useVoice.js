"use client";

import { createRecognition } from "./SpeechRecognizer";

import usePosStore from "@/store/usePosStore";

import { planCommand } from "@/agent/planner";
import { executePlan } from "@/agent/executor";

export default function useVoice() {
  const setListening = usePosStore((s) => s.setListening);
  const setTranscript = usePosStore((s) => s.setTranscript);
  const addTimeline = usePosStore((s) => s.addTimeline);
  const setAiConsoleOpen = usePosStore((s) => s.setAiConsoleOpen);

  const startListening = () => {
    const recognition = createRecognition();

    if (!recognition) {
      addTimeline(
        "Speech Recognition is not supported in this browser.",
        "error",
      );
      return;
    }

    // Automatically open the AI console
    setAiConsoleOpen(true);

    setListening(true);

    addTimeline("🎤 Listening...", "thinking");

    recognition.start();

    recognition.onresult = async (event) => {
      try {
        const transcript = event.results[0][0].transcript;

        setTranscript(transcript);

        addTimeline(`Heard: "${transcript}"`, "success");

        addTimeline("🧠 Understanding command...", "thinking");

        const plan = await planCommand(transcript);

        if (!plan.steps.length) {
          addTimeline("No action understood.", "error");
          return;
        }

        addTimeline(`Generated ${plan.steps.length} step(s).`, "info");

        await executePlan(plan);

        addTimeline("✅ Command completed.", "success");
      } catch (error) {
        console.error(error);

        addTimeline("Failed to process command.", "error");
      }
    };

    recognition.onerror = (event) => {
      console.error(event);

      addTimeline("Speech recognition failed.", "error");

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
