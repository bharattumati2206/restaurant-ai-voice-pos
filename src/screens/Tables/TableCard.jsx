"use client";

const styles = {
  AVAILABLE: {
    border: "border-emerald-500/40 hover:border-emerald-400",
    badge: "bg-emerald-500 text-emerald-950",
    pill: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    glow: "hover:shadow-emerald-950/40",
  },

  OCCUPIED: {
    border: "border-amber-500/40 hover:border-amber-400",
    badge: "bg-amber-500 text-amber-950",
    pill: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    glow: "hover:shadow-amber-950/40",
  },

  "Not Ready": {
    border: "border-rose-500/40 hover:border-rose-400",
    badge: "bg-rose-500 text-rose-950",
    pill: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
    glow: "hover:shadow-rose-950/40",
  },
};

// Default style for unknown/undefined statuses
const defaultStyle = styles.AVAILABLE;

export default function TableCard({ table, onClick }) {
  const style = styles[table.status] || defaultStyle;

  return (
    <button
      onClick={onClick}
      className={`
        group

        h-28

        rounded-xl

        border

        ${style.border}

        bg-[#141A26]/80
        backdrop-blur-md

        p-4

        text-left

        shadow-md

        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:shadow-xl
        active:scale-[0.98]
        ${style.glow}
      `}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-white tracking-wide">
            {table.name}
          </div>

          <div
            className={`h-2.5 w-2.5 rounded-full ${style.badge} animate-pulse`}
          />
        </div>

        <div>
          <div
            className={`
              inline-flex
              rounded-full
              px-2.5
              py-0.5

              text-[10px]
              font-bold
              tracking-wider
              uppercase

              ${style.pill}
            `}
          >
            {table.status}
          </div>
        </div>
      </div>
    </button>
  );
}
