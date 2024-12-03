"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const stats = [
  { label: "Of Road Projects Face Delays", value: "75%" },
  { label: "Cite Poor Communication", value: "65%" },
  { label: "Go Over Budget", value: "60%" },
  { label: "Experience Safety Issues", value: "40%" },
  { label: "Struggle with Resource Management", value: "55%" },
];

export const RoadStatistics = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black py-10">
      <div className="absolute inset-0 flex flex-col justify-between">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`${i == 1 ? `h-4` : `h-1`} w-full bg-white ${i == 1 ? `opacity-100` : `opacity-60`}`} />
        ))}
      </div>
      <motion.div
        className="flex gap-8"
        animate={{
          x: [0, -1035],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {[...stats, ...stats].map((stat, index) => (
          <Card
            key={index}
            className="flex-shrink-0 bg-gray-800 text-white border-gray-700 p-6 w-64 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

