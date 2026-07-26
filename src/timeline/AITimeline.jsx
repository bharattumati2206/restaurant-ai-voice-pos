"use client";

import { useEffect } from "react";

import usePosStore from "@/store/usePosStore";

import TimelineItem from "./TimelineItem";

import { Bot, X, Sparkles } from "lucide-react";

export default function AITimeline() {
  const timeline = usePosStore((s) => s.timeline);

  const addTimeline = usePosStore((s) => s.addTimeline);

  const open = usePosStore((s) => s.isAiConsoleOpen);
  const setOpen = usePosStore((s) => s.setAiConsoleOpen);

  useEffect(() => {
    if (timeline.length === 0) {
      addTimeline("Waiting for your command...");
    }
  }, []);

  return (
    <>
      {/* Floating AI Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            fixed
            bottom-8
            left-8
            z-50

            flex
            h-16
            w-16
            items-center
            justify-center

            rounded-full

            bg-violet-600

            shadow-2xl

            transition-all
            duration-300

            hover:scale-105
            hover:bg-violet-700
          "
        >
          <Bot size={28} className="text-white" />
        </button>
      )}

      {/* AI Console */}
      <div
        className={`
          fixed
          bottom-28
          left-8

          z-40

          flex
          flex-col

          w-[430px]
          h-[520px]

          rounded-2xl

          border
          border-slate-700

          bg-slate-900

          shadow-2xl

          origin-bottom-left

          transition-all
          duration-300

          ${
            open
              ? "opacity-100 scale-100 translate-y-0"
              : "pointer-events-none opacity-0 scale-95 translate-y-4"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-600 p-2">
              <Sparkles className="text-white" size={18} />
            </div>

            <div>
              <h2 className="font-semibold text-white">AI Assistant</h2>

              <p className="text-xs text-slate-400">Voice Execution Console</p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="
              rounded-lg
              p-2

              text-slate-400

              transition

              hover:bg-slate-800
              hover:text-white
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Timeline */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {timeline.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700 px-5 py-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {timeline.length} event(s)
            </span>

            <button
              onClick={() => setOpen(false)}
              className="
                rounded-lg

                bg-violet-600

                px-3
                py-2

                text-sm
                font-medium
                text-white

                transition

                hover:bg-violet-700
              "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
