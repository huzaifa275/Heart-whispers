/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import FloatingButterflies from "./components/FloatingButterflies";
import HeroSection from "./components/HeroSection";
import LetterSection from "./components/LetterSection";
import WhySpecialSection from "./components/WhySpecialSection";
import MagicalSkySection from "./components/MagicalSkySection";
import SurpriseSection from "./components/SurpriseSection";
import EndingSection from "./components/EndingSection";
import HeartWallSection from "./components/HeartWallSection";

export default function App() {
  const [loading, setLoading] = useState(true);

  // Smooth scroll handler to scroll down to the letter section
  const handleScrollToLetter = () => {
    const section = document.getElementById("letter-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-transparent overflow-x-hidden selection:bg-pink-200 selection:text-[#5D425A]">
      {/* Loading Screen Overlay */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Main website content wrapper (rendered but hidden or fades in) */}
      <div 
        className={`transition-opacity duration-1000 ease-out ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Enchanted Floating Butterflies mounted globally */}
        {!loading && <FloatingButterflies />}

        {/* Section 1: Hero Cover Section */}
        <HeroSection onNextSection={handleScrollToLetter} />

        {/* Section 2: Heartfelt Sincere Letter */}
        <LetterSection />

        {/* Section 3: Why She is Special Grid */}
        <WhySpecialSection />

        {/* Section 4: Twinkling Sky Star Blessings */}
        <MagicalSkySection />

        {/* Section 5: Surprise Box Petal Fountain */}
        <SurpriseSection />

        {/* Section 6: Peaceful Celestial Ending */}
        <EndingSection />

        {/* Section 7: Interactive Tap-to-Fill Love Wall */}
        <HeartWallSection />
      </div>
    </main>
  );
}
