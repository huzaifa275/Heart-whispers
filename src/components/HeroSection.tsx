/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import { Sparkles, Heart, ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onNextSection: () => void;
}

export default function HeroSection({ onNextSection }: HeroSectionProps) {
  const [typedText, setTypedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const fullText = "Some people enter our lives unexpectedly... and become family.";
  const typingSpeed = 50; // ms per char

  // Typing animation effect
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  // Soft background particle generation for the canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speedY: number;
      speedX: number;
      color: string;
      pulseSpeed: number;
      pulseDir: number;
    }> = [];

    const colors = ["rgba(244, 114, 182, ", "rgba(192, 132, 252, ", "rgba(251, 191, 36, ", "rgba(255, 255, 255, "];

    // Create particles
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.5 + 0.1,
        speedY: -(Math.random() * 0.4 + 0.1), // Float up
        speedX: (Math.random() - 0.5) * 0.3, // Gentle drift
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseDir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Create ambient light radial background matching Editorial Aesthetic
      const gradient = ctx.createRadialGradient(width / 2, height / 2.5, 50, width / 2, height / 2.5, width * 0.8);
      gradient.addColorStop(0, "#FFF5F7");
      gradient.addColorStop(0.5, "#F3E8FF");
      gradient.addColorStop(1, "#FEF9FC");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        // Wrap around boundaries
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Pulse opacity
        p.alpha += p.pulseSpeed * p.pulseDir;
        if (p.alpha > 0.6) {
          p.alpha = 0.6;
          p.pulseDir = -1;
        } else if (p.alpha < 0.1) {
          p.alpha = 0.1;
          p.pulseDir = 1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        
        // Glow effect for larger particles
        if (p.radius > 2) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color.replace("rgba", "rgb").split(",").slice(0, 3).join(",") + ")";
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 py-20"
    >
      {/* Canvas background for particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      {/* Luxury Background Ambient Glow */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl h-[450px] bg-gradient-to-tr from-pink-200/20 via-purple-200/15 to-amber-200/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center select-none">
        
        {/* Little decorative top element */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-pink-200/30 shadow-sm mb-8 animate-float">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[11px] font-mono tracking-widest text-[#5D425A]/80 uppercase">
            A Spiritual Brother's Tribute
          </span>
          <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
        </div>

        {/* Typing message with glass container */}
        <div className="min-h-[64px] mb-6 px-4 py-3 flex items-center justify-center">
          <p className="text-base md:text-xl font-serif italic text-[#6B5368] tracking-wide leading-relaxed max-w-2xl">
            {typedText}
            {!typingComplete && (
              <span className="inline-block w-1.5 h-5 ml-1 bg-pink-400 animate-ping" />
            )}
          </p>
        </div>

        {/* Main Title "❤️ For My Sister Abiha ❤️" with editorial gold-text effect */}
        <h1 
          className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold tracking-tight text-[#5D425A] mb-6 py-2 filter drop-shadow-[0_2px_10px_rgba(244,114,182,0.1)]"
        >
          <span className="text-pink-400 inline-block animate-pulse scale-95 hover:scale-110 transition-transform duration-300 mr-2 md:mr-4">❤️</span>
          For My Sister <span className="gold-text italic">Abiha</span>
          <span className="text-pink-400 inline-block animate-pulse scale-95 hover:scale-110 transition-transform duration-300 ml-2 md:mr-4">❤️</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg md:text-xl font-sans font-light text-[#6B5368]/85 max-w-xl mx-auto leading-relaxed mb-12 tracking-wide">
          "Distance never changes the place someone has in your heart."
        </p>

        {/* Glowing Button "✨ Open My Message" */}
        <button
          id="btn-open-message"
          onClick={onNextSection}
          className="group relative px-8 py-4 rounded-full overflow-hidden transition-all duration-500 transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          {/* Button Outer Pulse Border */}
          <div className="absolute inset-0 rounded-full border border-pink-300/60 group-hover:border-pink-400/80 transition-all duration-500 animate-pulse-glow" />
          
          {/* Button Background Gradient Fill */}
          <div className="absolute inset-[1px] rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Glowing Backlighting */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-pink-400 to-purple-300 blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500" />

          {/* Button Content */}
          <span className="relative z-10 flex items-center gap-3 text-white font-display font-medium tracking-wider text-sm md:text-base">
            <span>✨</span>
            Open My Message
            <Heart className="w-4 h-4 text-white fill-white/20 group-hover:scale-125 group-hover:fill-white/80 transition-all duration-300" />
          </span>
        </button>
      </div>

      {/* Floating Scroll Indicator */}
      <div 
        onClick={onNextSection}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-[#5D425A]/50 hover:text-[#5D425A]/90 transition-all duration-300 cursor-pointer animate-bounce"
        style={{ animationDuration: "2.5s" }}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll Down</span>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
}
