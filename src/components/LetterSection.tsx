/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Heart } from "lucide-react";

export default function LetterSection() {
  return (
    <section
      id="letter-section"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Decorative background lights */}
      <div className="absolute top-[10%] right-[10%] w-80 h-80 rounded-full bg-purple-100/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-80 h-80 rounded-full bg-pink-100/30 blur-[120px] pointer-events-none" />

      {/* Small top header for the section */}
      <div className="mb-8 flex flex-col items-center select-none text-center">
        <Heart className="w-6 h-6 text-pink-500 fill-pink-500/20 mb-3 animate-pulse" />
        <h2 className="text-2xl md:text-3xl font-display font-medium text-[#5D425A] tracking-wider">
          A Message from the Heart
        </h2>
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-pink-300 to-transparent mt-3" />
      </div>

      {/* The Premium Glass Card */}
      <div 
        className="w-full max-w-3xl glass-premium rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(220,180,210,0.3)] transition-all duration-700 ease-out"
      >
        {/* Magic glowing corner ornaments */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-pink-300/10 rounded-br-full blur-2xl group-hover:bg-pink-300/20 transition-all duration-700" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-300/10 rounded-tl-full blur-2xl group-hover:bg-amber-300/20 transition-all duration-700" />

        {/* Floating Sparks (Absolute Decoration) */}
        <Sparkles className="absolute top-8 right-8 w-5 h-5 text-amber-400/50 animate-pulse group-hover:scale-110 group-hover:text-amber-500 transition-all duration-500" />
        <Sparkles className="absolute bottom-8 left-8 w-4 h-4 text-pink-400/50 animate-pulse group-hover:scale-110 group-hover:text-pink-500 transition-all duration-500" style={{ animationDelay: "1.5s" }} />

        {/* Written Letter */}
        <div className="relative z-10 font-serif leading-relaxed text-center select-none">
          {/* Greeting: Dear Abiha, */}
          <h3 className="text-3xl sm:text-4xl font-semibold mb-10 text-[#5D425A] tracking-wide font-display">
            Dear Abiha,
          </h3>

          {/* Body Lines */}
          <div className="space-y-6 text-base sm:text-lg md:text-xl text-[#6B5368] font-light max-w-2xl mx-auto italic">
            <p className="hover:text-pink-600 transition-colors duration-300">
              I don't know what the future holds,
            </p>
            <p className="hover:text-pink-600 transition-colors duration-300">
              but I want you to know that meeting you was one of life's beautiful surprises.
            </p>

            {/* Decorative Divider */}
            <div className="py-6 flex justify-center items-center gap-2">
              <span className="w-1 h-1 bg-pink-400 rounded-full" />
              <span className="w-2 h-2 bg-purple-400 rounded-full" />
              <span className="w-1 h-1 bg-amber-300 rounded-full" />
            </div>

            <p className="hover:text-pink-600 transition-colors duration-300">
              Thank you for your kindness,
            </p>
            <p className="hover:text-pink-600 transition-colors duration-300">
              your support,
            </p>
            <p className="hover:text-pink-600 transition-colors duration-300">
              and for simply being yourself.
            </p>

            {/* Beautiful Prayer Box */}
            <div className="my-8 py-6 px-4 rounded-2xl bg-white/40 border border-pink-100/20 shadow-sm">
              <p className="text-[#5D425A] hover:text-pink-700 transition-colors duration-300 leading-loose not-italic font-sans text-sm sm:text-base font-medium">
                I sincerely pray that Allah fills your life with happiness, peace, success, good health, and countless beautiful moments.
              </p>
            </div>

            <p className="hover:text-pink-600 transition-colors duration-300 font-sans tracking-wide text-xs sm:text-sm uppercase text-[#A27B2C] font-semibold mt-4">
              Never forget how valuable you are.
            </p>

            <p className="hover:text-pink-600 transition-colors duration-300 mt-6">
              You'll always have a brother cheering for you.
            </p>
          </div>

          {/* Ending emoji 🤍 */}
          <div className="mt-12 flex justify-center">
            <div className="text-4xl filter drop-shadow-[0_0_8px_rgba(244,114,182,0.3)] animate-bounce" style={{ animationDuration: "3s" }}>
              🤍
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
