"use client";

import { AnimatePresence, motion } from "motion/react";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  show: boolean;
  onClose: () => void;
  duration?: number;
};

export default function MotionToast({
  message,
  type = "success",
  show,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [show, duration, onClose]);

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const Icon = type === "success" ? CheckCircle : AlertCircle;
  const iconColor = { success: "text-green-500", error: "text-red-500", info: "text-blue-500" };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          className={`fixed bottom-24 right-4 md:bottom-8 md:right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-lg max-w-xs ${colors[type]}`}
        >
          <Icon size={18} className={iconColor[type]} />
          <p className="text-sm font-medium flex-1">{message}</p>
          <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
