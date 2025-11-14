import { Cake, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 animate-float opacity-60">
          <Sparkles className="w-8 h-8 text-accent" />
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed opacity-60">
          <Heart className="w-10 h-10 text-primary" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float opacity-60">
          <Cake className="w-12 h-12 text-secondary" />
        </div>
        <div className="absolute top-60 right-10 animate-float-delayed opacity-60">
          <Sparkles className="w-6 h-6 text-celebration" />
        </div>
      </div>

     
      <div className="container mx-auto px-4 z-10">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="inline-block animate-bounce-in">
            <div className="text-8xl mb-4">🎂</div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-primary via-secondary to-celebration bg-clip-text text-transparent">
              Happy 1st Birthday
            </span>
            <div className="text-4xl md:text-6xl lg:text-7xl mt-4 bg-gradient-to-r from-celebration via-primary to-secondary bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
              Nana Yaw
            </div>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-foreground/80 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
            One year of pure joy, endless giggles, and countless precious moments. 
            Today we celebrate the brightest little star in our universe ✨
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-scale-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
            <Button
              size="lg"
              onClick={() => scrollToSection("memories")}
              className="gradient-primary text-white shadow-celebration hover:scale-105 transition-all duration-300 text-lg sm:text-xl px-10 py-7 rounded-full font-bold"
            >
              <Heart className="mr-2 w-6 h-6" />
              Our Beautiful Memories
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("milestones")}
              className="border-3 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground text-lg sm:text-xl px-10 py-7 rounded-full font-bold transition-all duration-300 shadow-lg"
            >
              <Sparkles className="mr-2 w-6 h-6" />
              Our Journey Together
            </Button>
          </div>
          
          <div className="mt-6 animate-fade-in" style={{ animationDelay: "0.6s", opacity: 0 }}>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-celebration to-secondary bg-clip-text text-transparent drop-shadow-lg">
              Obrempong loves you to the moon and back 🌙💖
            </p>
          </div>
        </div>
      </div>

      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path 
            fill="hsl(var(--card))" 
            fillOpacity="0.5" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
