import React, { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import PhotoCarousel from "@/components/PhotoCarousel";
import MilestonesSection from "@/components/MilestonesSection";
import CelebrationMessage from "@/components/CelebrationMessage";
import ConfettiEffect from "@/components/ConfettiEffect";
import InteractiveBalloons from "@/components/InteractiveBalloons";
import PhotoBooth from "@/components/PhotoBooth";
import BirthdayCake from "@/components/BirthdayCake";

const Index: React.FC = () => {
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/preview.jpg";
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <img
        src="/preview.jpg"
        alt="Background"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          bgLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ imageRendering: "auto" }}
      />

      
      <div className="relative z-10">
        <ConfettiEffect />
        <InteractiveBalloons />
        <PhotoBooth />
        <HeroSection />
        <PhotoCarousel />
        <MilestonesSection />
        <BirthdayCake />
        <CelebrationMessage />

        <footer className="py-8 text-center bg-card/50">
          <p className="text-muted-foreground">
            Made with 💖 for Nana Yaw's first birthday
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
