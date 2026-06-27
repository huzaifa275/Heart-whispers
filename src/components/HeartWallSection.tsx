/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect, useState, MouseEvent } from "react";
import { Sparkles, Heart } from "lucide-react";

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  colorStart: string;
  colorEnd: string;
  glowColor: string;
  speedY: number;
  speedX: number;
  amplitude: number; // For left/right drift sway
  frequency: number; // Speed of sway
  swayOffset: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  hasSparkles: boolean;
  scale: number;
  settlingY: number; // Target y-level to slow down and stack
  isSettled: boolean;
  el?: HTMLDivElement;
}

export default function HeartWallSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heartBoxRef = useRef<HTMLDivElement | null>(null);
  const heartContainerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HeartParticle[]>([]);
  const particleIdCounter = useRef(0);
  const [tapPrompt, setTapPrompt] = useState(true);
  const isInViewRef = useRef(true);

  // Set up IntersectionObserver and requestAnimationFrame render loop
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    // Track whether the user has scrolled outside of this section
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 } // Active when at least 5% is visible
    );
    observer.observe(section);

    let animationId: number;

    const render = () => {
      // Pause updates completely when scrolled away to preserve CPU and battery
      if (!isInViewRef.current) {
        animationId = requestAnimationFrame(render);
        return;
      }

      const particles = particlesRef.current;
      const container = heartContainerRef.current;
      const box = heartBoxRef.current;
      if (!container || !box) {
        animationId = requestAnimationFrame(render);
        return;
      }

      const width = box.clientWidth || 800;

      particles.forEach((p) => {
        if (!p.isSettled) {
          // ~5x faster floating speed!
          p.y += p.speedY;
          p.x += Math.sin(p.y * p.frequency + p.swayOffset) * p.amplitude * 0.05 + p.speedX;
          p.rotation += p.rotationSpeed;

          // Settle the hearts near the top beautifully
          if (p.y <= p.settlingY) {
            p.isSettled = true;
            p.speedY = 0;
            p.speedX = 0;
            p.rotationSpeed = 0;
          }
        } else {
          // Floating idle animation for settled hearts
          p.y += Math.sin(Date.now() * 0.001 + p.id) * 0.04;
          p.x += Math.cos(Date.now() * 0.001 + p.id) * 0.04;

          // Slowly fade out over time
          p.opacity -= 0.00035;
        }

        // Wrap around bounds horizontally
        if (p.x < -p.size) p.x = width + p.size;
        if (p.x > width + p.size) p.x = -p.size;

        // Apply smooth hardware-accelerated 3D transforms directly to the DOM node
        if (p.el) {
          p.el.style.transform = `translate3d(${p.x - p.size / 2}px, ${p.y - p.size / 2}px, 0) rotate(${p.rotation}rad) scale(${p.scale})`;
          p.el.style.opacity = `${p.opacity}`;
        }
      });

      // Filter out completely transparent or dead particles and remove their DOM nodes
      const aliveParticles: HeartParticle[] = [];
      particles.forEach((p) => {
        if (p.opacity > 0 && p.y >= -p.size) {
          aliveParticles.push(p);
        } else {
          if (p.el && p.el.parentNode === container) {
            container.removeChild(p.el);
          }
        }
      });
      particlesRef.current = aliveParticles;

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
      
      const container = heartContainerRef.current;
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  // Handle click events relative to Heart Box (no touch event hijack = buttery scroll)
  const handleBoxClick = (e: MouseEvent<HTMLDivElement>) => {
    // Stop generating if we are scrolled out of the section
    if (!isInViewRef.current) return;

    if (tapPrompt) {
      setTapPrompt(false);
    }

    const box = heartBoxRef.current;
    const heartContainer = heartContainerRef.current;
    if (!box || !heartContainer) return;

    const rect = box.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    // Click coordinates relative to the Heart Box boundaries
    const relativeX = clientX - rect.left;
    const relativeY = clientY - rect.top;

    // Spawn 4-5 gorgeous hearts per tap
    const spawnCount = Math.floor(Math.random() * 2) + 4;
    
    const colors = [
      { start: "#ff758f", end: "#f43f5e", glow: "rgba(244, 63, 94, 0.25)" },      // Rose
      { start: "#ff9ebb", end: "#ec4899", glow: "rgba(236, 72, 153, 0.25)" },    // Pink
      { start: "#c084fc", end: "#8b5cf6", glow: "rgba(139, 92, 246, 0.25)" },    // Purple
      { start: "#fcd34d", end: "#d97706", glow: "rgba(217, 119, 6, 0.25)" },     // Gold
      { start: "#f472b6", end: "#d946ef", glow: "rgba(217, 70, 239, 0.25)" },    // Fuchsia
    ];

    const currentParticles = particlesRef.current;
    const newHearts: HeartParticle[] = [];

    for (let i = 0; i < spawnCount; i++) {
      particleIdCounter.current += 1;
      const size = Math.random() * 16 + 15; // Beautiful larger, balanced sizes
      const chosenColor = colors[Math.floor(Math.random() * colors.length)];
      
      const boxHeight = box.clientHeight || 480;
      const settlingY = Math.random() * (boxHeight * 0.22) + (boxHeight * 0.04);

      // Floating speed is increased by 5x (soaring fast and smooth)
      const speedY = -(Math.random() * 11.0 + 10.0);

      const p: HeartParticle = {
        id: particleIdCounter.current,
        x: relativeX + (Math.random() - 0.5) * 24,
        y: relativeY + (Math.random() - 0.5) * 24,
        size,
        colorStart: chosenColor.start,
        colorEnd: chosenColor.end,
        glowColor: chosenColor.glow,
        speedY,
        speedX: (Math.random() - 0.5) * 0.6,
        amplitude: Math.random() * 10 + 5,
        frequency: Math.random() * 0.01 + 0.005,
        swayOffset: Math.random() * Math.PI,
        opacity: 1,
        rotation: (Math.random() - 0.5) * 0.4,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        hasSparkles: Math.random() > 0.35,
        scale: 1,
        settlingY,
        isSettled: false,
      };

      // Create high-performance absolute DOM node
      const gradId = `grad-${p.id}`;
      const div = document.createElement("div");
      div.id = `heart-${p.id}`;
      div.style.position = "absolute";
      div.style.width = `${p.size}px`;
      div.style.height = `${p.size}px`;
      div.style.pointerEvents = "none";
      div.style.willChange = "transform, opacity";
      div.style.left = "0px";
      div.style.top = "0px";
      div.style.transform = `translate3d(${p.x - p.size / 2}px, ${p.y - p.size / 2}px, 0) rotate(${p.rotation}rad)`;
      div.style.opacity = `${p.opacity}`;

      // Create optional orbital sparkles using hardware accelerated CSS
      let sparklesHtml = "";
      if (p.hasSparkles) {
        sparklesHtml = `
          <div style="position: absolute; width: 6px; height: 6px; background: #fff; clip-path: polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%); top: -10px; right: -10px; animation: sparklePulse 1.5s infinite ease-in-out;"></div>
          <div style="position: absolute; width: 4px; height: 4px; background: #fef08a; clip-path: polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%); bottom: -8px; left: -8px; animation: sparklePulse 2s infinite ease-in-out; animation-delay: 0.5s;"></div>
        `;
      }

      // Embed high contrast glossy vectors
      div.innerHTML = `
        <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; filter: drop-shadow(0 4px 10px ${p.glowColor});">
          <defs>
            <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${p.colorStart}" />
              <stop offset="100%" stop-color="${p.colorEnd}" />
            </linearGradient>
          </defs>
          <path d="M50,18 C35,2 3,12 3,42 C3,72 50,96 50,96 C50,96 97,72 97,42 C97,12 65,2 50,18 Z" fill="url(#${gradId})" />
          <ellipse cx="32" cy="32" rx="16" ry="8" transform="rotate(-30 32 32)" fill="rgba(255, 255, 255, 0.35)" />
          <path d="M50,18 C35,2 3,12 3,42" fill="none" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1.8" stroke-linecap="round" />
        </svg>
        ${sparklesHtml}
      `;

      heartContainer.appendChild(div);
      p.el = div;
      newHearts.push(p);
    }

    // Keep a maximum of 80 active hearts at once, removing oldest ones to maintain pristine framerates
    let activeParticles = [...currentParticles, ...newHearts];
    if (activeParticles.length > 80) {
      const overflowCount = activeParticles.length - 80;
      const toRemove = activeParticles.slice(0, overflowCount);
      toRemove.forEach((p) => {
        if (p.el && p.el.parentNode === heartContainer) {
          heartContainer.removeChild(p.el);
        }
      });
      activeParticles = activeParticles.slice(overflowCount);
    }

    particlesRef.current = activeParticles;
  };

  return (
    <section
      ref={containerRef}
      id="heart-wall-section"
      className="relative w-full min-h-screen flex flex-col items-center justify-start py-20 px-4 overflow-hidden select-none"
    >
      {/* Background radial glowing gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl h-[400px] bg-pink-100/30 rounded-full blur-[130px]" />
      </div>

      {/* Section Title */}
      <div className="text-center max-w-xl mb-8 pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50/50 border border-pink-100/30 text-xs text-pink-600 font-mono tracking-widest uppercase mb-3 font-semibold">
          <Heart className="w-3.5 h-3.5 fill-pink-400 animate-pulse" />
          <span>Love Wall</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-[#5D425A]">
          Love Wall for Abiha
        </h2>
      </div>

      {/* Beautiful Dedicated Heart Box */}
      <div
        ref={heartBoxRef}
        className="relative w-full max-w-4xl h-[480px] rounded-3xl border border-pink-200/50 bg-white/45 backdrop-blur-md overflow-hidden shadow-xl shadow-pink-100/25 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-100/35 cursor-pointer"
        onClick={handleBoxClick}
      >
        {/* Dynamic heart container inside the box. Overflow is hidden at the box level. */}
        <div
          ref={heartContainerRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
        />

        {/* Box Inner Interactive Overlay (Floating Hint) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none z-20">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-pink-200/20 rounded-full blur-xl scale-125 animate-ping" />
            <Heart className="w-10 h-10 text-pink-500 fill-pink-500/80 filter drop-shadow-[0_0_8px_rgba(244,114,182,0.3)] animate-bounce" />
          </div>

          <p 
            className={`text-sm sm:text-base font-light leading-relaxed tracking-wider transition-all duration-700 ${
              tapPrompt ? "text-pink-600 text-glow-pink animate-pulse font-medium" : "text-[#6B5368]/60"
            }`}
          >
            {tapPrompt 
              ? "Tap anywhere inside this box to fill it with love. ❤️" 
              : "Keep tapping... let's fill this box with blessings! ✨"
            }
          </p>
        </div>
      </div>

      {/* Closing Message Section */}
      <div className="relative z-20 text-center max-w-2xl mt-16 px-4 pointer-events-none flex flex-col items-center">
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-pink-300 to-transparent mb-8" />
        
        <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#5D425A] tracking-wider mb-4 animate-float">
          ✨ Made Especially For Abiha ✨
        </h3>
        
        <p className="text-base sm:text-lg font-sans font-medium text-[#6B5368] mb-6">
          With Endless Duas, Respect & Warm Wishes. <span className="text-pink-500">🤍🌸</span>
        </p>

        <p className="text-sm sm:text-base md:text-lg font-serif italic text-[#5D425A]/90 leading-relaxed max-w-xl mx-auto py-4 px-6 rounded-2xl bg-white/30 border border-pink-100/10 shadow-sm">
          "May Allah always keep your heart full of peace, your life full of happiness, and your smile forever beautiful."
        </p>

        {/* Small Glowing Heart Icon pulsing at the end */}
        <div className="mt-8 relative">
          <div className="absolute inset-0 bg-pink-300/30 rounded-full blur-md scale-150 animate-pulse" />
          <Heart className="w-6 h-6 text-pink-500 fill-pink-400 filter drop-shadow-[0_0_8px_rgba(244,114,182,0.5)] animate-pulse" style={{ animationDuration: "1.2s" }} />
        </div>
      </div>

      {/* Small floating sparkles around */}
      <div className="absolute bottom-10 left-10 pointer-events-none">
        <Sparkles className="w-5 h-5 text-amber-500/30 animate-pulse" />
      </div>
      <div className="absolute top-10 right-10 pointer-events-none" style={{ animationDelay: "2s" }}>
        <Sparkles className="w-5 h-5 text-pink-500/30 animate-pulse" />
      </div>

      {/* Embedded style tags for GPU animations */}
      <style>{`
        @keyframes sparklePulse {
          0%, 100% { transform: scale(0.5); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
