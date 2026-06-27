/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { Sparkles, Heart, Gift, X } from "lucide-react";

export default function SurpriseSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Shake the box randomly to entice clicking
  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => {
      setIsShaking(true);
      const timeout = setTimeout(() => setIsShaking(false), 800);
      return () => clearTimeout(timeout);
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Particle Engine for the Canvas Confetti / Flower Petals / Hearts
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class/interface
    interface Particle {
      x: number;
      y: number;
      size: number;
      type: "heart" | "petal" | "sparkle";
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      gravity: number;
      wind: number;
    }

    const list: Particle[] = [];
    const colors = ["#f472b6", "#ec4899", "#c084fc", "#a855f7", "#fbbf24", "#ffffff", "#fda4af"];

    // Initialize confetti fountain
    const spawnParticles = () => {
      // Fountain source is bottom center of canvas
      const startX = width / 2;
      const startY = height / 1.7;

      for (let i = 0; i < 150; i++) {
        const angle = Math.PI * 1.5 + (Math.random() - 0.5) * 1.3; // Point upwards
        const force = Math.random() * 12 + 4;
        const speedX = Math.cos(angle) * force;
        const speedY = Math.sin(angle) * force;

        // Determine particle type
        const rand = Math.random();
        let type: "heart" | "petal" | "sparkle" = "sparkle";
        if (rand < 0.35) {
          type = "heart";
        } else if (rand < 0.7) {
          type = "petal";
        }

        list.push({
          x: startX,
          y: startY,
          size: Math.random() * 12 + 6,
          type,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX,
          speedY,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.1,
          opacity: 1,
          gravity: 0.18,
          wind: (Math.random() - 0.5) * 0.05,
        });
      }
    };

    spawnParticles();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Render loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      list.forEach((p, idx) => {
        p.speedY += p.gravity;
        p.speedX += p.wind;
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Fade out as it falls near the bottom
        if (p.y > height * 0.8) {
          p.opacity -= 0.02;
        }

        if (p.opacity <= 0) {
          list.splice(idx, 1);
          return;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.type === "heart") {
          // Draw simple bezier curve heart
          ctx.beginPath();
          const d = p.size;
          ctx.moveTo(0, -d / 4);
          ctx.bezierCurveTo(-d / 2, -d / 1.5, -d, -d / 3, 0, d / 1.5);
          ctx.bezierCurveTo(d, -d / 3, d / 2, -d / 1.5, 0, -d / 4);
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
        } else if (p.type === "petal") {
          // Draw almond shape cherry blossom petal
          ctx.beginPath();
          const d = p.size;
          ctx.moveTo(0, -d / 2);
          ctx.quadraticCurveTo(-d / 2, 0, 0, d / 2);
          ctx.quadraticCurveTo(d / 2, 0, 0, -d / 2);
          ctx.shadowBlur = 3;
          ctx.shadowColor = "rgba(244,114,182,0.4)";
          ctx.fill();
        } else {
          // Sparkle (little star shape)
          ctx.beginPath();
          const d = p.size / 2;
          ctx.moveTo(0, -d);
          ctx.lineTo(d / 3, -d / 3);
          ctx.lineTo(d, 0);
          ctx.lineTo(d / 3, d / 3);
          ctx.lineTo(0, d);
          ctx.lineTo(-d / 3, d / 3);
          ctx.lineTo(-d, 0);
          ctx.lineTo(-d / 3, -d / 3);
          ctx.closePath();
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#ffffff";
          ctx.fill();
        }

        ctx.restore();
      });

      // Maintain background creation of a few sparkles while open
      if (Math.random() < 0.15 && list.length < 180) {
        list.push({
          x: width / 2 + (Math.random() - 0.5) * 80,
          y: height / 1.7,
          size: Math.random() * 8 + 4,
          type: Math.random() > 0.5 ? "sparkle" : "heart",
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: (Math.random() - 0.5) * 4,
          speedY: -(Math.random() * 5 + 3),
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          opacity: 1,
          gravity: 0.1,
          wind: (Math.random() - 0.5) * 0.02,
        });
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isOpen]);

  const handleBoxClick = () => {
    setIsOpen(true);
    // Open message modal shortly after explosion
    const timeout = setTimeout(() => {
      setShowModal(true);
    }, 1200);
    return () => clearTimeout(timeout);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsOpen(false); // Reset to allow opening again
  };

  return (
    <section
      id="surprise-section"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 px-4 overflow-hidden"
    >
      {/* Absolute particle canvas */}
      {isOpen && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-30"
        />
      )}

      {/* Glow backgrounds */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-3xl h-[400px] bg-pink-100/30 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Title */}
      <div className="relative z-10 text-center max-w-xl mb-12 select-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/40 border border-pink-100/30 text-xs text-pink-600 font-mono tracking-widest uppercase mb-4 animate-float font-semibold">
          <Gift className="w-3.5 h-3.5 text-pink-500 fill-pink-500/20" />
          <span>A Gentle Gesture</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#5D425A] mb-4">
          A Magical Surprise
        </h2>
        
        <p className="text-sm sm:text-base text-[#6B5368]/80 leading-relaxed">
          I've kept a small spiritual gift here. Touch the beautiful glowing box below to open the seal.
        </p>
      </div>

      {/* Interactive Box Area */}
      <div className="relative flex flex-col items-center justify-center h-[320px] w-full max-w-md select-none">
        
        {/* Magic aura under the box */}
        <div className={`absolute bottom-4 w-44 h-12 bg-pink-300/30 rounded-full blur-2xl filter transition-all duration-1000 ${
          isOpen ? "scale-[2.5] opacity-5" : "scale-100 opacity-60 animate-pulse"
        }`} />

        {/* The Gift Box */}
        <div
          onClick={!isOpen ? handleBoxClick : undefined}
          className={`relative z-20 cursor-pointer transition-all duration-700 ${
            isShaking ? "animate-wiggle" : ""
          } ${isOpen ? "scale-90 opacity-80" : "hover:scale-105 active:scale-95"}`}
        >
          {/* Box lid & base combined in a beautifully stylized layout */}
          <div className="relative w-44 h-44 flex flex-col items-center">
            
            {/* The Lid - flies up on open */}
            <div 
              className={`absolute top-0 w-48 h-12 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-lg shadow-md border border-white/20 flex items-center justify-center transition-all duration-1000 ease-out z-10 ${
                isOpen ? "-translate-y-24 rotate-12 opacity-0 scale-95" : ""
              }`}
            >
              {/* Ribbon bow on top of lid */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-6 flex justify-between pointer-events-none">
                <div className="w-6 h-6 border-4 border-amber-300 rounded-full bg-gradient-to-br from-amber-400 to-amber-300 rotate-12 shadow-[0_0_10px_rgba(251,191,36,0.2)]" />
                <div className="w-6 h-6 border-4 border-amber-300 rounded-full bg-gradient-to-br from-amber-400 to-amber-300 -rotate-12 -translate-x-1 shadow-[0_0_10px_rgba(251,191,36,0.2)]" />
              </div>
              
              {/* Gold Ribbon strip cross */}
              <div className="w-6 h-full bg-gradient-to-b from-amber-300 to-amber-200 border-x border-amber-400/20" />
            </div>

            {/* The Body - beautiful Editorial lavender-plum */}
            <div 
              className={`absolute top-10 w-44 h-32 bg-gradient-to-b from-purple-200 via-purple-300 to-[#5d425a] rounded-b-xl shadow-lg border border-purple-200/50 overflow-hidden flex justify-center transition-transform duration-1000 ${
                isOpen ? "translate-y-4" : ""
              }`}
            >
              {/* Gold Vertical Ribbon Strip */}
              <div className="w-6 h-full bg-gradient-to-b from-amber-200 via-amber-300 to-amber-200 border-x border-amber-400/20 shadow-sm relative flex items-center justify-center">
                {/* Heart emblem on center of ribbon */}
                <div className="absolute top-[40%] w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center border border-pink-200 shadow-[0_0_12px_rgba(244,114,182,0.4)]">
                  <Heart className="w-4 h-4 text-white fill-white/85 animate-pulse" />
                </div>
              </div>

              {/* Magical light glowing inside body */}
              <div className={`absolute inset-0 bg-pink-400/20 mix-blend-color-dodge transition-opacity duration-1000 ${
                isOpen ? "opacity-100 animate-pulse" : "opacity-0"
              }`} />
            </div>

            {/* Glowing sparkle items hovering around the box */}
            {!isOpen && (
              <>
                <Sparkles className="absolute -top-6 -right-8 w-6 h-6 text-amber-500 animate-bounce" style={{ animationDuration: "3.2s" }} />
                <Sparkles className="absolute bottom-4 -left-10 w-5 h-5 text-pink-400 animate-float" style={{ animationDuration: "4s" }} />
              </>
            )}
          </div>
        </div>
        
        {/* Click indicator helper */}
        {!isOpen && (
          <span className="text-glow-pink mt-6 text-xs text-pink-600 font-mono tracking-widest uppercase animate-pulse font-semibold">
            Touch to Unlock ❤️
          </span>
        )}
      </div>

      {/* The Surprise Modal Card Popup with frosted light Editorial styling */}
      <div 
        id="surprise-modal"
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-700 bg-[#FEF9FC]/80 backdrop-blur-md ${
          showModal ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div 
          className="relative max-w-lg w-full glass-premium rounded-3xl p-8 md:p-10 shadow-xl overflow-hidden animate-float-slow"
          style={{
            border: "1px solid rgba(244, 114, 182, 0.25)",
          }}
        >
          {/* Top-right close button */}
          <button 
            onClick={handleCloseModal}
            className="absolute top-5 right-5 text-[#5D425A]/50 hover:text-[#5D425A] hover:bg-pink-100/50 p-2 rounded-full transition-all duration-300 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Decorative design */}
          <div className="absolute -top-10 -left-10 w-28 h-28 bg-pink-100/30 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-amber-100/30 rounded-full blur-2xl" />

          {/* Letter Content exactly as written */}
          <div className="text-center font-serif leading-relaxed text-[#5D425A]">
            
            {/* Soft decorative element */}
            <div className="inline-flex justify-center items-center gap-1.5 mb-6 text-pink-500">
              <Heart className="w-4 h-4 fill-pink-500/20" />
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              <Heart className="w-4 h-4 fill-pink-500/20" />
            </div>

            {/* Custom letter exactly as requested */}
            <p className="text-lg md:text-xl font-light italic leading-loose select-none whitespace-pre-line text-[#5D425A]">
              "Abiha, you may not be my sister by blood, but you'll always be my sister by heart.

              Thank you for being part of my life.

              May Allah always protect you, bless you, and keep your smile forever.

              ❤️🌸"
            </p>

            {/* Bottom button close */}
            <button
              onClick={handleCloseModal}
              className="mt-8 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-xs font-mono uppercase tracking-widest text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              Close and Keep Wishing
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(-8deg); }
          30% { transform: rotate(6deg); }
          45% { transform: rotate(-5deg); }
          60% { transform: rotate(4deg); }
          75% { transform: rotate(-2deg); }
        }
        .animate-wiggle {
          animation: wiggle 0.8s ease-in-out;
        }
      `}</style>
    </section>
  );
}
