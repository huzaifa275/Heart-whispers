/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Moon, Sparkles, Heart } from "lucide-react";

export default function EndingSection() {
  const [fireflies, setFireflies] = useState<Array<{ id: number; left: string; top: string; delay: string; duration: string; size: string }>>([]);

  useEffect(() => {
    // Generate 15 floating fireflies
    const items = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 90 + 5}%`,
      top: `${Math.random() * 80 + 10}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 5 + 4}s`,
      size: `${Math.random() * 4 + 2}px`,
    }));
    setFireflies(items);
  }, []);

  return (
    <section
      id="ending-section"
      className="relative w-full min-h-[90vh] flex flex-col items-center justify-center py-24 px-4 overflow-hidden"
    >
      {/* Glow aura */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-[300px] bg-amber-100/30 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating fireflies */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {fireflies.map((ff) => (
          <div
            key={ff.id}
            className="absolute rounded-full bg-yellow-300 shadow-[0_0_8px_#f59e0b,0_0_15px_#fbbf24]"
            style={{
              left: ff.left,
              top: ff.top,
              width: ff.size,
              height: ff.size,
              animation: `firefly-drift ${ff.duration} infinite ease-in-out`,
              animationDelay: ff.delay,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Magical Moon Representation */}
      <div className="relative mb-14 select-none group">
        {/* Soft backglow behind the moon */}
        <div className="absolute inset-0 bg-amber-200/10 rounded-full blur-3xl scale-150 animate-pulse group-hover:scale-[1.8] transition-transform duration-[4s]" />

        {/* Golden glowing crescent Moon in customized SVG */}
        <div className="relative animate-float-slow">
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]"
          >
            {/* Elegant crescent curve */}
            <path
              d="M75 15C55 15 35 32 35 55C35 75 50 90 75 90C82 90 88 88 92 85C70 88 50 78 45 58C40 38 52 22 75 15Z"
              fill="url(#moon-gradient)"
            />
            
            {/* Stars near the moon */}
            <circle cx="20" cy="30" r="1.5" fill="#f43f5e" opacity="0.6" className="animate-pulse" />
            <circle cx="28" cy="70" r="1" fill="#f59e0b" opacity="0.6" style={{ animationDelay: "1s" }} className="animate-pulse" />
            <circle cx="85" cy="40" r="1.2" fill="#ec4899" opacity="0.6" style={{ animationDelay: "0.5s" }} className="animate-pulse" />

            <defs>
              <linearGradient id="moon-gradient" x1="30" y1="15" x2="90" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Main spiritual quote */}
      <div className="relative z-10 max-w-3xl text-center select-none px-4">
        
        {/* Decorative sparkles */}
        <div className="flex justify-center items-center gap-1 mb-6 text-amber-500/40">
          <Sparkles className="w-4 h-4" />
          <span className="w-1.5 h-[1px] bg-amber-400/30" />
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        {/* Quote text exactly as requested */}
        <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#5D425A] font-medium leading-relaxed tracking-wide max-w-2xl mx-auto mb-10">
          "Some bonds are written by blood... others are written by Allah."
        </p>

        {/* Decorative Divider */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-pink-400/40 to-transparent mx-auto mb-8" />

        {/* Dedication credit */}
        <p className="text-xs sm:text-sm font-sans font-light tracking-widest text-[#6B5368]/60 uppercase">
          Made with respect, prayers, and lots of duas. <span className="text-pink-600">🤍🌸</span>
        </p>
      </div>

      <style>{`
        @keyframes firefly-drift {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.8);
          }
          30% {
            opacity: 0.8;
          }
          70% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translate(calc(20px + 30px * var(--idx, 0.5)), calc(-40px - 20px * var(--idx, 0.5))) scale(1.1);
          }
        }
      `}</style>
    </section>
  );
}
