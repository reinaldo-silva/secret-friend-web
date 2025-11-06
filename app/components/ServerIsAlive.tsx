"use client";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, XCircle } from "lucide-react";
import { SERVER_STATUS, useWebSocket } from "../contexts/WebsocketContext";

export function ServerIsAlive() {
  const { status } = useWebSocket();

  const getStatus = () => {
    switch (status) {
      case SERVER_STATUS.ALIVE:
        return {
          text: "Online",
          icon: <CheckCircle2 className="text-green-600" size={18} />,
        };
      case SERVER_STATUS.DOWN:
        return {
          text: "Offline",
          icon: <XCircle className="text-red-500" size={18} />,
        };
      default:
        return {
          text: "Verificando...",
          icon: (
            <div className="relative">
              <Activity className="text-yellow-500" size={18} />
              <Activity
                className="text-yellow-500 animate-ping absolute top-0 left-0"
                size={18}
              />
            </div>
          ),
        };
    }
  };

  const { text, icon } = getStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        fixed top-4 right-4 flex items-center gap-2 px-4 py-2 
        rounded-xl border text-sm font-medium
        bg-linear-to-r from-purple-100 to-pink-100 text-purple-800 
        border-purple-300 shadow-lg shadow-purple-200/50
      "
    >
      {icon}
      <span>{text}</span>
    </motion.div>
  );
}
