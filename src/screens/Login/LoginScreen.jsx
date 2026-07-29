"use client";

import { useEffect, useState } from "react";

import PinPad from "./PinPad";

import usePosStore from "@/store/usePosStore";

import { employees } from "@/mock/employees";

export default function LoginScreen() {
  const enteredPin = usePosStore((s) => s.enteredPin);

  const appendPin = usePosStore((s) => s.appendPin);

  const clearPin = usePosStore((s) => s.clearPin);

  const backspacePin = usePosStore((s) => s.backspacePin);

  const login = usePosStore((s) => s.login);

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    const employee = employees.find((e) => e.pin === enteredPin);

    if (!employee) {
      alert("Invalid PIN");
      return;
    }

    login(employee);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#0F141C] via-[#0A0D14] to-[#07090E] flex flex-col overflow-hidden select-none">
      {/* Header */}

      <header className="h-16 border-b border-amber-500/10 bg-[#121722]/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full" />
          <div>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 text-lg font-extrabold tracking-wider uppercase">
              Restaurant AI POS
            </h1>

            <p className="text-[11px] text-slate-400 font-medium tracking-wide">Executive Restaurant Portal</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-amber-200 text-xs font-bold tracking-widest">{time}</div>

          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Voice Terminal • Idle</div>
        </div>
      </header>

      {/* Login Card */}

      <div className="flex-1 flex justify-center items-center p-6">
        <div className="w-[350px] rounded-2xl bg-[#141A26]/80 backdrop-blur-xl shadow-2xl shadow-black/80 border border-amber-500/15 p-6">
          <div className="text-center mb-5">
            <h2 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 tracking-wide">
              Server Login
            </h2>

            <p className="mt-1 text-[11px] text-slate-400 font-medium">
              Enter 4-digit staff passcode
            </p>
          </div>

          <div className="relative mb-5">
            <input
              value={"●".repeat(enteredPin.length)}
              readOnly
              placeholder="● ● ● ●"
              className="
                h-13
                w-full
                rounded-xl
                border
                border-amber-500/30
                bg-[#0B0E14]
                text-center
                text-2xl
                font-extrabold
                tracking-[12px]
                text-amber-400
                placeholder-slate-700
                shadow-inner
                outline-none
                transition-all
              "
            />
          </div>

          <PinPad
            onPress={appendPin}
            onClear={clearPin}
            onBackspace={backspacePin}
            onEnter={handleEnter}
          />
        </div>
      </div>
    </div>
  );
}
