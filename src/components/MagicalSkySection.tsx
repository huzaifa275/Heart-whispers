/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Star, Sparkles, Heart } from "lucide-react";
import { StarMessage } from "../types";

export default function MagicalSkySection() {
  const messages = [
    "Keep Smiling",
    "Allah Bless You",
    "Stay Happy",
    "You Matter",
    "Believe In Yourself",
    "Never Give Up",
  ];

  const [interactiveStars, setInteractiveStars] = useState<StarMessage[]>([]);
  const [decorStars, setDecorStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: string }>>([]);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [activeStarId, setActiveStarId] = useState<number | null>(null);
  const [showSparkles, setShowSparkles] = useState(false);

  // Initialize stars once
  useEffect(() => {
    // Generate 50 background decorative stars
    const backgroundStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 96 + 2,
      y: Math.random() * 85 + 5,
      size: Math.random() * 1.5 + 0.5,
      delay: `${Math.random() * 5}s`,
    }));
    setDecorStars(backgroundStars);

    // Generate 8 interactive stars placed nicely
    const clickableStars: StarMessage[] = [
      { id: 101, text: messages[0], x: 20, y: 30, size: 22, color: "text-pink-500", twinkleDelay: "0s" },
      { id: 102, text: messages[1], x: 45, y: 15, size: 24, color: "text-[#AA771C]", twinkleDelay: "1s" },
      { id: 103, text: messages[2], x: 75, y: 25, size: 21, color: "text-purple-500", twinkleDelay: "2s" },
      { id: 104, text: messages[3], x: 15, y: 65, size: 20, color: "text-rose-500", twinkleDelay: "1.5s" },
      { id: 105, text: messages[4], x: 80, y: 60, size: 23, color: "text-amber-600", twinkleDelay: "2.5s" },
      { id: 106, text: messages[5], x: 50, y: 75, size: 25, color: "text-pink-500", twinkleDelay: "0.5s" },
      { id: 107, text: messages[1], x: 30, y: 50, size: 22, color: "text-purple-500", twinkleDelay: "3s" },
      { id: 108, text: messages[4], x: 65, y: 45, size: 20, color: "text-[#AA771C]", twinkleDelay: "1.8s" },
    ];
    setInteractiveStars(clickableStars);
  }, []);

  const handleStarClick = (star: StarMessage) => {
    // Pick a random message from the list to make it fully dynamic as requested
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    
    setSelectedMessage(randomMsg);
    setActiveStarId(star.id);
    setShowSparkles(true);

    // Reset sparkles after animation
    const timeout = setTimeout(() => {
      setShowSparkles(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  return (
    <section
      id="magical-sky-section"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 px-4 overflow-hidden"
    >
      {/* Background Nebulas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-indigo-100/30 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-pink-100/30 blur-[120px]" />
      </div>

      {/* Decorative Moon Reflection Aura */}
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full bg-amber-100/20 blur-[120px]" />

      {/* Twinkling Background Stars (Purely Decorative) */}
      <div className="absolute inset-0 pointer-events-none">
        {decorStars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-pink-300"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animation: `twinkle-decor 4s infinite ease-in-out`,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      {/* Content Header */}
      <div className="relative z-10 text-center max-w-2xl mb-16 select-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/40 border border-pink-100/30 text-xs text-pink-600 font-mono tracking-widest uppercase mb-4 font-semibold">
          <Star className="w-3.5 h-3.5 fill-pink-400 animate-pulse" />
          <span>Tap to Whisper</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#5D425A] mb-4">
          The Magical Sky
        </h2>
        
        <p className="text-sm sm:text-base text-[#6B5368]/80 leading-relaxed">
          The universe is full of unspoken prayers. Click any of the golden glowing stars in the sky to reveal a magical blessing for you, Abiha.
        </p>
      </div>

      {/* The Sky Stage (Interactive Zone) */}
      <div className="relative w-full max-w-4xl h-[450px] rounded-3xl border border-pink-100/20 bg-gradient-to-b from-pink-50/20 to-purple-50/20 backdrop-blur-sm overflow-hidden shadow-xl">
        
        {/* Sky constellations faint lines when star is clicked */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-45">
          {activeStarId && interactiveStars.map((s, idx) => {
            const nextStar = interactiveStars[(idx + 1) % interactiveStars.length];
            return (
              <line
                key={`line-${idx}`}
                x1={`${s.x}%`}
                y1={`${s.y}%`}
                x2={`${nextStar.x}%`}
                y2={`${nextStar.y}%`}
                stroke="rgba(244, 114, 182, 0.4)"
                strokeWidth="1"
                className="transition-all duration-1000"
                style={{
                  strokeDasharray: "4,4",
                }}
              />
            );
          })}
        </svg>

        {/* Interactive Twinkling Stars */}
        {interactiveStars.map((star) => {
          const isActive = activeStarId === star.id;
          return (
            <button
              key={star.id}
              onClick={() => handleStarClick(star)}
              className="absolute group -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400/50 rounded-full p-2 transition-transform active:scale-95 z-20"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
              }}
            >
              {/* Outer Glow Halo */}
              <div 
                className={`absolute inset-0 rounded-full blur-[8px] bg-amber-400/30 group-hover:bg-pink-400/50 group-hover:scale-150 transition-all duration-500 ${
                  isActive ? "bg-pink-400/50 scale-[2] animate-ping" : "scale-100 animate-pulse"
                }`}
                style={{ animationDuration: "2s" }}
              />

              {/* Star Icon */}
              <Star
                className={`w-6 h-6 transition-all duration-500 group-hover:scale-125 filter drop-shadow-[0_0_6px_rgba(162,123,44,0.4)] ${
                  isActive ? "text-pink-500 fill-pink-500 scale-125 rotate-45" : "text-[#AA771C] hover:text-pink-500 hover:fill-pink-500/20"
                }`}
                strokeWidth={1.5}
              />

              {/* Little sparkle overlay on hover */}
              <Sparkles className="absolute -top-1 -right-1 w-3.5 h-3.5 text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce" />
            </button>
          );
        })}

        {/* Message Overlay Display */}
        <div className="absolute inset-x-0 bottom-10 flex justify-center z-10 px-4">
          <div 
            className={`glass-premium rounded-2xl px-6 py-4 max-w-sm text-center transition-all duration-700 transform flex flex-col items-center gap-2 ${
              selectedMessage 
                ? "opacity-100 translate-y-0 scale-100" 
                : "opacity-0 translate-y-4 scale-95 pointer-events-none"
            }`}
            style={{
              border: "1px solid rgba(244, 114, 182, 0.25)",
            }}
          >
            <div className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500/40 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-pink-600 uppercase font-semibold">A Celestial Wish</span>
              <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500/40 animate-pulse" />
            </div>
            
            <p className="text-lg md:text-xl font-serif text-[#5D425A] font-medium tracking-wide py-1 select-none">
              "{selectedMessage}"
            </p>

            {/* Little helper info */}
            <span className="text-[9px] text-[#6B5368]/50">Tap another star for another wish</span>
          </div>
        </div>

        {/* Sparkle Particles Burst Animation */}
        {showSparkles && (
          <div className="absolute inset-0 pointer-events-none z-30">
            {Array.from({ length: 15 }).map((_, idx) => {
              const activeStar = interactiveStars.find(s => s.id === activeStarId);
              const startX = activeStar ? activeStar.x : 50;
              const startY = activeStar ? activeStar.y : 50;
              
              // Random vectors
              const angle = Math.random() * Math.PI * 2;
              const distance = Math.random() * 80 + 20;
              const targetX = startX + Math.cos(angle) * (distance / 8);
              const targetY = startY + Math.sin(angle) * (distance / 4);

              return (
                <div
                  key={`sparkle-${idx}`}
                  className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 animate-ping"
                  style={{
                    left: `${startX}%`,
                    top: `${startY}%`,
                    transform: `translate(-50%, -50%)`,
                    animation: "burst-fly 0.8s forwards ease-out",
                    "--target-x": `${targetX}%`,
                    "--target-y": `${targetY}%`,
                  } as any}
                />
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes twinkle-decor {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.25);
          }
        }
        @keyframes burst-fly {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            left: var(--target-x);
            top: var(--target-y);
          }
        }
      `}</style>
    </section>
  );
}
