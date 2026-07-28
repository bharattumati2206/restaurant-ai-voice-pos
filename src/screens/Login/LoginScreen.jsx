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
    <div className="min-h-screen bg-slate-900">
      {/* Header */}

      <header className="h-16 border-b border-slate-700 bg-slate-950 flex items-center justify-between px-8">
        <div>
          <h1 className="text-white text-xl font-semibold">
            Restaurant AI POS
          </h1>

          <p className="text-xs text-slate-400">Employee Login</p>
        </div>

        <div className="text-right">
          <div className="text-white font-semibold">{time}</div>

          <div className="text-xs text-slate-400">Voice Assistant Demo</div>
        </div>
      </header>

      {/* Login */}

      <div className="flex justify-center items-start pt-12">
        <div className="w-[360px] rounded-2xl bg-slate-800 shadow-2xl border border-slate-700 p-8">
          <h2 className="text-center text-3xl font-semibold text-white">
            Login
          </h2>

          <p className="mt-2 mb-6 text-center text-sm text-slate-400">
            Enter your employee PIN
          </p>

          <input
            value={"●".repeat(enteredPin.length)}
            readOnly
            placeholder="● ● ● ●"
            className="
              mb-6
              h-14
              w-full
              rounded-lg
              border
              border-slate-300
              bg-white
              text-center
              text-3xl
              font-bold
              tracking-[10px]
              text-slate-900
              outline-none
            "
          />

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
