"use client";

import usePosStore from "../store/usePosStore";
import { Sparkles } from "lucide-react";

import LoginScreen from "../screens/Login/LoginScreen";
import TableScreen from "../screens/Tables/TablesScreen";
import OrderScreen from "../screens/Order/OrderScreen";
import CheckoutScreen from "../screens/Checkout/CheckoutScreen";

import VoiceButton from "../voice/VoiceButton";
import AITimeline from "../timeline/AITimeline";

export default function AppShell() {
  const currentScreen = usePosStore((state) => state.currentScreen);
  const isAiProcessing = usePosStore((state) => state.isAiProcessing);

  return (
    <div className="h-screen bg-[#1a1f2e] overflow-hidden relative select-none">
      {/* Floating AI Processing Banner */}
      {isAiProcessing && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 rounded-full border border-amber-400/50 bg-[#262d3f]/95 px-4 py-2 text-xs font-bold text-amber-300 shadow-2xl shadow-amber-950/80 backdrop-blur-xl animate-pulse">
          <div className="flex h-2.5 w-2.5 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </div>
          <Sparkles size={15} className="text-amber-400 animate-spin shrink-0" />
          <span className="tracking-wide">AI Processing Request...</span>
        </div>
      )}

      {currentScreen === "LOGIN" && <LoginScreen />}
      {currentScreen === "TABLES" && <TableScreen />}
      {currentScreen === "ORDER" && <OrderScreen />}
      {currentScreen === "CHECKOUT" && <CheckoutScreen />}

      <AITimeline />
      <VoiceButton />
    </div>
  );
}
