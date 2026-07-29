"use client";

import { Mic, Volume2 } from "lucide-react";
import usePosStore from "@/store/usePosStore";
import useVoice from "./useVoice";

export default function VoiceButton() {
  const isListening = usePosStore((s) => s.isListening);
  const isSpeaking = usePosStore((s) => s.isSpeaking);

  const { startListening } = useVoice();

  return (
    <button
      disabled={isSpeaking}
      onClick={startListening}
      title={
        isSpeaking
          ? "AI Assistant is speaking..."
          : isListening
          ? "Listening..."
          : "Tap to Speak"
      }
      className={`
        fixed
        bottom-6
        right-6
        z-50

        flex
        h-14
        w-14
        items-center
        justify-center

        rounded-full

        shadow-xl

        transition-all
        duration-300
        select-none

        ${
          isSpeaking
            ? "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 border-2 border-amber-200 shadow-amber-950/70 animate-bounce opacity-90 cursor-not-allowed"
            : isListening
            ? "bg-gradient-to-r from-rose-600 to-red-500 shadow-rose-950/80 animate-pulse scale-110 border-2 border-white ring-4 ring-rose-500/40"
            : "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-amber-950/50 hover:scale-105 active:scale-95 border border-amber-300/50"
        }
      `}
    >
      {isSpeaking ? (
        <Volume2 size={24} className="text-slate-950 animate-pulse" />
      ) : (
        <Mic size={24} className={isListening ? "text-white animate-spin" : "text-slate-950"} />
      )}
    </button>
  );
}
