"use client";

import { CheckCircle, AlertCircle, Brain, Info } from "lucide-react";

const icons = {
  info: <Info size={16} />,
  success: <CheckCircle size={16} />,
  error: <AlertCircle size={16} />,
  thinking: <Brain size={16} />,
};

const colors = {
  info: "text-gray-700",
  success: "text-green-600",
  error: "text-red-600",
  thinking: "text-blue-600",
};

export default function TimelineItem({ item }) {
  return (
    <div className={`flex gap-2 ${colors[item.type] || colors.info}`}>
      <div className="mt-1">{icons[item.type] || icons.info}</div>

      <div className="text-sm">{item.message}</div>
    </div>
  );
}
