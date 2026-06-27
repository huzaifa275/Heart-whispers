/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Butterfly } from "../types";

export default function FloatingButterflies() {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);

  useEffect(() => {
    // Generate initial butterflies with random parameters
    const initialButterflies: Butterfly[] = Array.from({ length: 4 }).map((_, index) => {
      return {
        id: index,
        x: Math.random() * 80 + 10, // percentage x
        y: Math.random() * 80 + 10, // percentage y
        scale: Math.random() * 0.4 + 0.35, // scale size
        angle: Math.random() * 360,
        speed: Math.random() * 0.5 + 0.3,
        wingSpeed: Math.random() * 0.2 + 0.1,
        color: index % 3 === 0 ? "#f472b6" : index % 3 === 1 ? "#c084fc" : "#fbbf24",
        glow: index % 3 === 0 ? "rgba(244,114,182,0.6)" : index % 3 === 1 ? "rgba(192,132,252,0.6)" : "rgba(251,191,36,0.6)",
      };
    });
    setButterflies(initialButterflies);

    // Update positions gently
    const interval = setInterval(() => {
      setButterflies((prev) =>
        prev.map((b) => {
          // Adjust angle slightly for natural organic wandering
          const angleDelta = (Math.random() - 0.5) * 15;
          const newAngle = (b.angle + angleDelta) % 360;
          const rad = (newAngle * Math.PI) / 180;

          // Move along the angle
          let newX = b.x + Math.cos(rad) * b.speed * 0.5;
          let newY = b.y + Math.sin(rad) * b.speed * 0.5;

          // Wrap around edges gracefully
          if (newX < -10) newX = 110;
          if (newX > 110) newX = -10;
          if (newY < -10) newY = 110;
          if (newY > 110) newY = -10;

          return {
            ...b,
            x: newX,
            y: newY,
            angle: newAngle,
          };
        })
      );
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {butterflies.map((b) => {
        // Calculate flap duration based on wing speed
        const flapDuration = `${b.wingSpeed}s`;
        return (
          <div
            key={b.id}
            className="absolute transition-all duration-[80ms] ease-linear"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              transform: `translate(-50%, -50%) scale(${b.scale}) rotate(${b.angle + 90}deg)`,
              filter: `drop-shadow(0 0 10px ${b.color})`,
            }}
          >
            {/* The Butterfly SVG */}
            <svg
              width="50"
              height="40"
              viewBox="0 0 50 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative"
            >
              {/* Left Wing */}
              <path
                d="M25 20C21 5 3 0 5 15C6 25 20 23 25 20Z"
                fill={b.color}
                fillOpacity="0.85"
                className="origin-[right_center]"
                style={{
                  animation: `wing-flap-left ${flapDuration} ease-in-out infinite alternate`,
                }}
              />
              <path
                d="M25 20C21 28 8 35 10 28C12 21 22 21 25 20Z"
                fill={b.color}
                fillOpacity="0.7"
                className="origin-[right_center]"
                style={{
                  animation: `wing-flap-left ${flapDuration} ease-in-out infinite alternate`,
                }}
              />

              {/* Right Wing */}
              <path
                d="M25 20C29 5 47 0 45 15C44 25 30 23 25 20Z"
                fill={b.color}
                fillOpacity="0.85"
                className="origin-[left_center]"
                style={{
                  animation: `wing-flap-right ${flapDuration} ease-in-out infinite alternate`,
                }}
              />
              <path
                d="M25 20C29 28 42 35 40 28C38 21 28 21 25 20Z"
                fill={b.color}
                fillOpacity="0.7"
                className="origin-[left_center]"
                style={{
                  animation: `wing-flap-right ${flapDuration} ease-in-out infinite alternate`,
                }}
              />

              {/* Body */}
              <ellipse cx="25" cy="20" rx="2" ry="8" fill="#ffffff" />
              {/* Antennae */}
              <path d="M24 12C23 8 20 6 18 7" stroke="#ffffff" strokeWidth="0.7" />
              <path d="M26 12C27 8 30 6 32 7" stroke="#ffffff" strokeWidth="0.7" />
            </svg>
            
            {/* Soft sparkle background under butterfly */}
            <div
              className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full blur-[8px] animate-ping opacity-30 pointer-events-none"
              style={{ animationDuration: "3s" }}
            />
          </div>
        );
      })}

      <style>{`
        @keyframes wing-flap-left {
          0% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(0.15);
          }
        }
        @keyframes wing-flap-right {
          0% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(0.15);
          }
        }
      `}</style>
    </div>
  );
}
