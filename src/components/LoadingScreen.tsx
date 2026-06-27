/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Increment progress smoothly over 2.5 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 22);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Small delay before starting fade out
      const timeout = setTimeout(() => {
        setFadeOut(true);
        // Let fade animation complete before calling onComplete
        const completeTimeout = setTimeout(() => {
          onComplete();
        }, 800);
        return () => clearTimeout(completeTimeout);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div
      id="loading-screen"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FEF9FC] transition-opacity duration-700 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Magic Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-72 h-72 rounded-full bg-pink-100/60 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[15%] w-72 h-72 rounded-full bg-purple-100/60 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative flex flex-col items-center text-center px-6 max-w-md z-10">
        {/* Glowing Heart Container */}
        <div className="relative mb-10 group">
          {/* Heart Glow Background */}
          <div className="absolute inset-0 scale-125 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full blur-2xl opacity-60 animate-pulse" />
          
          <div className="relative animate-bounce" style={{ animationDuration: "1.8s" }}>
            <Heart
              id="loading-heart"
              className="w-24 h-24 text-pink-400 fill-pink-300/80 filter drop-shadow-[0_0_15px_rgba(244,114,182,0.4)]"
              strokeWidth={1.5}
            />
            {/* Inner little heart */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-8 h-8 text-white fill-white/95 animate-ping absolute" />
            </div>
          </div>
        </div>

        {/* Elegant typography */}
        <h1 className="text-2xl md:text-3xl font-serif tracking-widest text-[#5D425A] font-medium mb-8 select-none">
          For Someone Special...
        </h1>

        {/* Loading Progress Bar Container */}
        <div className="w-64 h-[4px] bg-pink-100/50 rounded-full overflow-hidden relative border border-pink-200/20">
          <div
            className="h-full bg-gradient-to-r from-pink-400 via-purple-300 to-amber-300 rounded-full transition-all duration-75 ease-out shadow-[0_0_8px_rgba(244,114,182,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Small percentage */}
        <span className="mt-3 text-[10px] font-mono tracking-widest text-[#5D425A]/60 uppercase">
          Whispering prayers... {progress}%
        </span>
      </div>
    </div>
  );
}
