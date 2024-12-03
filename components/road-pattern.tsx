"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const RoadPattern: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                #ffffff 0px,
                #ffffff 50px,
                #000000 50px,
                #000000 100px
              )
            `,
            backgroundSize: '100px 10px',
          }}
          animate={{
            x: [0, -100],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'linear',
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

