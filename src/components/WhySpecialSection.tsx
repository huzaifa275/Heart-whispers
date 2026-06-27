/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Star } from "lucide-react";
import { SpecialCard } from "../types";

export default function WhySpecialSection() {
  const cards: SpecialCard[] = [
    {
      id: "kind-heart",
      icon: "🌸",
      title: "Kind Heart",
      description: "Your empathy, gentleness, and pure-hearted energy brighten up even the darkest of days, leaving comfort in every word you speak.",
      color: "from-pink-100/50 to-rose-50/30 border-pink-200/60",
      glowColor: "group-hover:shadow-[0_12px_30px_rgba(244,114,182,0.15)]",
    },
    {
      id: "beautiful-soul",
      icon: "✨",
      title: "Beautiful Soul",
      description: "A genuine purity and grace that shines from deep within you, reflecting goodness and bringing joy to everyone privileged to know you.",
      color: "from-amber-100/50 to-yellow-50/30 border-amber-200/60",
      glowColor: "group-hover:shadow-[0_12px_30px_rgba(251,191,36,0.15)]",
    },
    {
      id: "wonderful-personality",
      icon: "😊",
      title: "Wonderful Personality",
      description: "A beautiful, uplifting combination of wisdom, true humbleness, and a heartwarming presence that makes conversations so peaceful.",
      color: "from-indigo-100/50 to-purple-50/30 border-purple-200/60",
      glowColor: "group-hover:shadow-[0_12px_30px_rgba(192,132,252,0.15)]",
    },
    {
      id: "caring-nature",
      icon: "💖",
      title: "Caring Nature",
      description: "Always thinking of others first, praying for their happiness, and providing steady, comforting support without ever expecting anything in return.",
      color: "from-purple-100/50 to-fuchsia-50/30 border-pink-200/60",
      glowColor: "group-hover:shadow-[0_12px_30px_rgba(168,85,247,0.15)]",
    },
    {
      id: "one-of-a-kind",
      icon: "🌷",
      title: "One of a Kind",
      description: "In a world full of duplicates, your unique perspective, authentic character, and sincere values make you absolutely priceless and irreplaceable.",
      color: "from-teal-100/50 to-emerald-50/30 border-teal-200/60",
      glowColor: "group-hover:shadow-[0_12px_30px_rgba(16,185,129,0.15)]",
    },
    {
      id: "best-online-sister",
      icon: "🤍",
      title: "Best Online Sister",
      description: "Bound not by blood, but by sincere respect, mutual prayers, and pure sisterly care that spans across physical boundaries and screens.",
      color: "from-sky-100/50 to-blue-50/30 border-sky-200/60",
      glowColor: "group-hover:shadow-[0_12px_30px_rgba(14,165,233,0.15)]",
    },
  ];

  return (
    <section
      id="why-special-section"
      className="relative w-full py-24 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-[300px] bg-purple-100/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Title block */}
      <div className="max-w-3xl mx-auto text-center mb-16 select-none">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#A27B2C] uppercase mb-3 font-semibold">
          <Star className="w-3.5 h-3.5 fill-[#A27B2C] animate-spin" style={{ animationDuration: "12s" }} />
          <span>Pure Traits</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-[#5D425A] mb-4">
          Why You Are Special
        </h2>
        
        <p className="text-sm sm:text-base text-[#6B5368]/80 max-w-xl mx-auto leading-relaxed">
          Every person carries unique virtues, but some stars shine with a much softer, gentler, and more beautiful light.
        </p>
      </div>

      {/* Grid of cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {cards.map((c, idx) => {
          return (
            <div
              key={c.id}
              className={`group relative glass rounded-2xl p-6 sm:p-8 flex flex-col items-start transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 ${c.glowColor} border border-pink-100/20`}
              style={{
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                animationDelay: `${idx * 100}ms`,
              }}
            >
              {/* Card Hover Border Gradient Highlight */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

              {/* Icon / Emoji circle */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 bg-pink-50/50 border border-pink-100/30"
              >
                <span className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] select-none">
                  {c.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-display font-semibold text-[#5D425A] mb-3 group-hover:text-pink-600 transition-colors duration-300 flex items-center gap-2">
                {c.title}
                <Sparkles className="w-3.5 h-3.5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </h3>

              {/* Description */}
              <p className="text-sm text-[#6B5368]/90 leading-relaxed font-light">
                {c.description}
              </p>

              {/* Corner accent glow lines */}
              <div className="absolute top-0 right-0 w-8 h-[1px] bg-pink-200/20 group-hover:bg-pink-300/40 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-[1px] h-8 bg-pink-200/20 group-hover:bg-pink-300/40 transition-colors duration-300" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
