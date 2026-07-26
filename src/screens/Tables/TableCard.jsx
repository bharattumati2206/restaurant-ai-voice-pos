"use client";

const styles = {
  AVAILABLE: {
    border: "border-emerald-500",
    badge: "bg-emerald-500",
    glow: "hover:shadow-emerald-500/30",
  },

  OCCUPIED: {
    border: "border-amber-500",
    badge: "bg-amber-500",
    glow: "hover:shadow-amber-500/30",
  },

  DIRTY: {
    border: "border-red-500",
    badge: "bg-red-500",
    glow: "hover:shadow-red-500/30",
  },
};

export default function TableCard({ table, onClick }) {
  const style = styles[table.status];

  return (
    <button
      onClick={onClick}
      className={`
        group

        h-36

        rounded-2xl

        border-2
        ${style.border}

        bg-slate-900

        p-5

        text-left

        shadow-lg

        transition-all
        duration-300

        hover:-translate-y-1
        hover:scale-[1.02]
        hover:shadow-2xl
        ${style.glow}
      `}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">{table.name}</div>

          <div className={`h-4 w-4 rounded-full ${style.badge}`} />
        </div>

        <div>
          <div
            className={`
              inline-flex
              rounded-full
              px-3
              py-1

              text-xs
              font-semibold
              text-white

              ${style.badge}
            `}
          >
            {table.status}
          </div>
        </div>
      </div>
    </button>
  );
}
