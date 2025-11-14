import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Baby, Heart, Smile, Star, Footprints, Music, Images } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";

interface MediaItem {
  src: string;
  type: "image" | "video";
}

interface Milestone {
  icon: LucideIcon;
  month: string;
  title: string;
  description: string;
  color: string;
  media: MediaItem[];
}

const MilestonesSection = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  
  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 1024);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const handleSwipe = () => {
    if (!isMobile || touchStartX.current === null || touchEndX.current === null) return;
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX > 50) handleNextMedia(); 
    else if (deltaX < -50) handlePreviousMedia(); 
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handlePreviousMedia = () => {
    if (selectedMediaIndex > 0) setSelectedMediaIndex(selectedMediaIndex - 1);
  };

  const handleNextMedia = () => {
    const current = selectedMilestone !== null ? milestones[selectedMilestone] : null;
    if (current && selectedMediaIndex < current.media.length - 1) setSelectedMediaIndex(selectedMediaIndex + 1);
  };

  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 1024) return; 
      if (selectedMilestone === null) return;

      if (e.key === "ArrowLeft") handlePreviousMedia();
      else if (e.key === "ArrowRight") handleNextMedia();
      else if (e.key === "Escape") setSelectedMilestone(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMilestone, selectedMediaIndex]);

  const milestones: Milestone[] = [
    {
      icon: Baby,
      month: "Month 1",
      title: "Hello World!",
      description: "Your arrival brought endless joy to our lives",
      color: "text-primary",
      media: [{ src: "/first-days.jpg", type: "image" }],
    },
    {
      icon: Smile,
      month: "Month 2-3",
      title: "First Smile",
      description: "That magical moment when you smiled at us",
      color: "text-secondary",
      media: [{ src: "/first-smile.jpg", type: "image" }],
    },
    {
      icon: Music,
      month: "Month 4-5",
      title: "Giggles & Coos",
      description: "Your laughter became our favorite sound",
      color: "text-accent",
      media: [
        { src: "/endless.jpg", type: "image" },
        { src: "/first-smile.jpg", type: "image" },
        { src: "/giggles.jpg", type: "image" },
      ],
    },
    {
      icon: Footprints,
      month: "Month 6-8",
      title: "On the Move",
      description: "exploring, discovering the world",
      color: "text-celebration",
      media: [
        { src: "/on-1.jpg", type: "image" },
        { src: "/on-2.jpg", type: "image" },
        { src: "/on-3.jpg", type: "image" },
        { src: "/on-4.jpg", type: "image" },
        { src: "/on-5.jpg", type: "image" },
      ],
    },
    {
      icon: Star,
      month: "Month 9-11",
      title: "Standing Tall",
      description: "Growing stronger and more confident each day",
      color: "text-primary",
      media: [
        { src: "/on-the-move.mp4", type: "video" },
        { src: "/first-steps.jpg", type: "image" },
      ],
    },
    {
      icon: Heart,
      month: "Month 12",
      title: "One Year Old!",
      description: "A whole year of love, laughter, and learning",
      color: "text-secondary",
      media: [
        { src: "/birthday-1.jpg", type: "image" },
        { src: "/birthday-2.jpg", type: "image" },
        { src: "/birthday-3.jpg", type: "image" },
        { src: "/birthday-4.jpg", type: "image" },
      ],
    },
  ];

  const selectedMilestoneData = selectedMilestone !== null ? milestones[selectedMilestone] : null;
  const SelectedIcon = selectedMilestoneData?.icon;

  return (
    <section id="milestones" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Our Journey Together
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Every month brought new adventures and precious milestones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {milestones.map((milestone, index) => {
            const MilestoneIcon = milestone.icon;
            const firstMedia = milestone.media[0];

            return (
              <Card
                key={index}
                onClick={() => {
                  setSelectedMilestone(index);
                  setSelectedMediaIndex(0);
                }}
                className="overflow-hidden shadow-soft hover:shadow-celebration transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 border-2 cursor-pointer group relative"
              >
                <CardContent className="p-0 relative">
                  {firstMedia && (
                    <div className="relative h-48 overflow-hidden bg-muted/30">
                      {firstMedia.type === "video" ? (
                        <video src={firstMedia.src} className="w-full h-full object-cover" />
                      ) : (
                        <img src={firstMedia.src} alt={milestone.title} className="w-full h-full object-cover" />
                      )}
                      {milestone.media.length > 1 && (
                        <Badge className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border-2 flex items-center gap-1">
                          <Images className="w-3 h-3" />
                          {milestone.media.length}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="p-6 relative">
                    <div className="flex items-start gap-4">
                      <div className={`${milestone.color} p-3 rounded-full bg-muted/50`}>
                        <MilestoneIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-muted-foreground mb-1">
                          {milestone.month}
                        </p>
                        <h3 className="text-xl font-bold mb-2 text-foreground">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        
        <Dialog open={selectedMilestone !== null} onOpenChange={() => setSelectedMilestone(null)}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
            {selectedMilestoneData && SelectedIcon && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <SelectedIcon className={`w-7 h-7 ${selectedMilestoneData.color}`} />
                    {selectedMilestoneData.title}
                  </DialogTitle>
                  <p className="text-muted-foreground text-base">
                    {selectedMilestoneData.month} - {selectedMilestoneData.description}
                  </p>
                </DialogHeader>

                {selectedMilestoneData.media.length > 0 && (
                  <div
                    className="mt-4 relative flex items-center justify-center touch-pan-y"
                    onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
                    onTouchMove={(e) => (touchEndX.current = e.touches[0].clientX)}
                    onTouchEnd={handleSwipe}
                  >
                   
                    <div
                      className="absolute inset-0 filter blur-xl scale-105 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${selectedMilestoneData.media[selectedMediaIndex].src})`,
                      }}
                    />
                   
                    {selectedMilestoneData.media[selectedMediaIndex].type === "video" ? (
                      <video
                        controls
                        className="relative z-10 max-h-[70vh] w-auto"
                        key={`${selectedMilestone}-${selectedMediaIndex}`}
                      >
                        <source src={selectedMilestoneData.media[selectedMediaIndex].src} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={selectedMilestoneData.media[selectedMediaIndex].src}
                        alt=""
                        className="relative z-10 max-h-[70vh] w-auto object-contain"
                      />
                    )}

                  
                    {selectedMilestoneData.media.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {selectedMilestoneData.media.map((_, idx) => (
                          <span
                            key={idx}
                            className={`w-2 h-2 rounded-full ${
                              idx === selectedMediaIndex ? "bg-white" : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default MilestonesSection;
