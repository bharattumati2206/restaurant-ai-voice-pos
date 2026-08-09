"use client";

export default function MenuItemCard({ item, onSelect }) {
  return (
    <button
      onClick={() => onSelect(item)}
      className="
        h-24
        w-full
        rounded-xl
        border
        border-amber-500/20
        bg-[#313a4d]/80
        backdrop-blur-md
        p-3.5
        transition-all
        duration-200
        hover:border-amber-400/60
        hover:bg-[#3a4459]
        hover:shadow-lg
        hover:shadow-amber-950/30
        hover:-translate-y-0.5
        active:scale-[0.98]
        flex
        flex-col
        justify-between
        text-left
        group
        select-none
      "
    >
      <div className="flex items-center justify-between w-full">
        <span className="text-xs font-bold leading-snug text-slate-100 group-hover:text-amber-200 transition-colors pr-2 line-clamp-2">
          {item.name}
        </span>

        <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-300 shrink-0">
          ${item.price.toFixed(2)}
        </span>
      </div>

      <div className="flex items-center justify-between w-full text-[10px] text-slate-400">
        <span className="truncate max-w-[150px]">
          {item.modifiers?.length > 0 ? `${item.modifiers.length} option(s)` : "Standard"}
        </span>

        {item.popular && (
          <span className="text-amber-400 font-semibold uppercase tracking-wider">
            Popular
          </span>
        )}
      </div>
    </button>
  );
}
