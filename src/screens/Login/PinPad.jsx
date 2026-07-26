"use client";

export default function PinPad({ onPress, onClear, onBackspace, onEnter }) {
  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div className="grid grid-cols-3 gap-3">
      {buttons.map((num) => (
        <button
          key={num}
          onClick={() => onPress(num)}
          className="
            h-16
            rounded-lg
            border
            border-slate-500
            bg-slate-800
            text-xl
            text-white

            transition-all
            duration-200

            hover:bg-blue-600
            hover:border-blue-600
          "
        >
          {num}
        </button>
      ))}

      <button
        onClick={onClear}
        className="
          h-16
          rounded-lg
          bg-red-600
          text-white
          font-medium

          transition-all
          duration-200

          hover:bg-red-700
        "
      >
        CLR
      </button>

      <button
        onClick={() => onPress("0")}
        className="
          h-16
          rounded-lg
          border
          border-slate-500
          bg-slate-800
          text-xl
          text-white

          transition-all
          duration-200

          hover:bg-blue-600
          hover:border-blue-600
        "
      >
        0
      </button>

      <button
        onClick={onBackspace}
        className="
          h-16
          rounded-lg
          bg-slate-300
          text-xl

          transition-all
          duration-200

          hover:bg-slate-400
        "
      >
        ⌫
      </button>

      <button
        onClick={onEnter}
        className="
          col-span-3
          h-16
          rounded-lg

          bg-blue-600
          text-lg
          font-semibold
          text-white

          transition-all
          duration-200

          hover:bg-blue-700
        "
      >
        ENTER
      </button>
    </div>
  );
}
