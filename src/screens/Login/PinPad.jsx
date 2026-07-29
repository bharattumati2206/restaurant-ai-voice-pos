"use client";

export default function PinPad({ onPress, onClear, onBackspace, onEnter }) {
  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {buttons.map((num) => (
        <button
          key={num}
          onClick={() => onPress(num)}
          className="
            h-13
            rounded-xl
            border
            border-slate-700/60
            bg-slate-800/70
            text-lg
            font-semibold
            text-slate-100

            shadow-sm

            transition-all
            duration-150

            hover:bg-amber-500/20
            hover:border-amber-500/50
            hover:text-amber-300
            active:scale-[0.97]
          "
        >
          {num}
        </button>
      ))}

      <button
        onClick={onClear}
        className="
          h-13
          rounded-xl
          bg-gradient-to-r
          from-rose-700
          to-red-600
          text-xs
          font-bold
          text-white
          tracking-wider
          shadow-md
          shadow-rose-950/40

          transition-all
          duration-150

          hover:from-rose-600
          hover:to-red-500
          active:scale-[0.97]
        "
      >
        CLR
      </button>

      <button
        onClick={() => onPress("0")}
        className="
          h-13
          rounded-xl
          border
          border-slate-700/60
          bg-slate-800/70
          text-lg
          font-semibold
          text-slate-100

          shadow-sm

          transition-all
          duration-150

          hover:bg-amber-500/20
          hover:border-amber-500/50
          hover:text-amber-300
          active:scale-[0.97]
        "
      >
        0
      </button>

      <button
        onClick={onBackspace}
        className="
          h-13
          rounded-xl
          border
          border-slate-700/60
          bg-slate-800/70
          text-sm
          font-bold
          text-slate-300

          shadow-sm

          transition-all
          duration-150

          hover:bg-slate-700
          hover:text-white
          active:scale-[0.97]
        "
      >
        ⌫
      </button>

      <button
        onClick={onEnter}
        className="
          col-span-3
          h-13
          rounded-xl

          bg-gradient-to-r
          from-emerald-600
          via-teal-600
          to-emerald-500
          text-xs
          font-extrabold
          text-white
          tracking-widest
          uppercase

          shadow-lg
          shadow-emerald-950/50

          transition-all
          duration-150

          hover:from-emerald-500
          hover:to-teal-400
          hover:shadow-emerald-900/60
          active:scale-[0.98]
        "
      >
        ENTER
      </button>
    </div>
  );
}
