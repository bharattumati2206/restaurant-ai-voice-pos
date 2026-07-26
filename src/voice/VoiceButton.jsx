"use client";

import { Mic } from "lucide-react";

import usePosStore from "@/store/usePosStore";
import useVoice from "./useVoice";

export default function VoiceButton() {
  const isListening = usePosStore((s) => s.isListening);

  const { startListening } = useVoice();

  return (
    <button
      onClick={startListening}
      className={`
        fixed
        bottom-8
        right-8
        z-50

        flex
        h-16
        w-16
        items-center
        justify-center

        rounded-full

        shadow-2xl

        transition-all
        duration-300

        ${
          isListening
            ? "bg-red-600 scale-110 animate-pulse"
            : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
        }
      `}
    >
      <Mic size={28} className="text-white" />
    </button>
  );
}
