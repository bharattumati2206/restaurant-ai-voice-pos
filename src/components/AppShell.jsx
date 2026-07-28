"use client";

import usePosStore from "../store/usePosStore";

import LoginScreen from "../screens/Login/LoginScreen";
import TableScreen from "../screens/Tables/TablesScreen";
import OrderScreen from "../screens/Order/OrderScreen";
import CheckoutScreen from "../screens/Checkout/CheckoutScreen";

import VoiceButton from "../voice/VoiceButton";
import AITimeline from "../timeline/AITimeline";

const AI_CONSOLE_HEIGHT = 250;

export default function AppShell() {
  const currentScreen = usePosStore((state) => state.currentScreen);

  return (
    <div className="h-screen bg-slate-950 overflow-hidden relative">
      {currentScreen === "LOGIN" && <LoginScreen />}
      {currentScreen === "TABLES" && <TableScreen />}
      {currentScreen === "ORDER" && <OrderScreen />}
      {currentScreen === "CHECKOUT" && <CheckoutScreen />}

      <AITimeline />
      <VoiceButton />
    </div>
  );
}
