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
            bottom-6
            left-6
            z-50

            flex
            h-14
            w-14
            items-center
            justify-center

            rounded-full

            bg-gradient-to-r
            from-indigo-600
            to-violet-600
            border
            border-indigo-400/40

            shadow-xl
            shadow-indigo-950/50

            transition-all
            duration-200

            hover:scale-105
            hover:from-indigo-500
            hover:to-violet-500
            active:scale-95
          "
        >
          <Bot size={24} className="text-white" />
        </button>
      )}

      {/* AI Console */}
      <div
        className={`
          fixed
          bottom-24
          left-6

          z-40

          flex
          flex-col

          w-[390px]
          h-[440px]

          rounded-2xl

          border
          border-amber-500/20

          bg-[#262d3f]/95
          backdrop-blur-xl

          shadow-2xl
          shadow-black/90

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
        <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 p-1.5 shadow-sm">
              <Sparkles className="text-slate-950" size={16} />
            </div>

            <div>
              <h2 className="font-bold text-white text-xs tracking-wide">AI Timeline Console</h2>

              <p className="text-[10px] text-slate-400">Live Voice Agent Reasoning</p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="
              rounded-lg
              p-1.5

              text-slate-400

              transition

              hover:bg-slate-800
              hover:text-white
            "
          >
            <X size={16} />
          </button>
        </div>

        {/* Timeline */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 custom-scrollbar">
          {timeline.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700/80 px-4 py-2.5 shrink-0 bg-[#202536]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-medium">
              {timeline.length} event(s) logged
            </span>

            <button
              onClick={() => setOpen(false)}
              className="
                rounded-lg

                bg-slate-800
                border
                border-slate-700/60

                px-3
                py-1.5

                text-xs
                font-semibold
                text-slate-200

                transition

                hover:bg-slate-700
                hover:text-white
              "
            >
              Minimize
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
