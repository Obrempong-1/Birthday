import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Heart, Star } from "lucide-react";

const CelebrationMessage = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-card/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-celebration border-4 border-primary/20 overflow-hidden animate-scale-in">
            <div className="gradient-primary p-8 text-center">
              <div className="flex justify-center gap-4 mb-4">
                <Sparkles className="w-8 h-8 text-primary-foreground animate-pulse" />
                <Star className="w-10 h-10 text-primary-foreground" />
                <Sparkles className="w-8 h-8 text-primary-foreground animate-pulse" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                A Special Message
              </h2>
            </div>
            
            <CardContent className="p-8 md:p-12 space-y-6 text-center bg-card">
              <div className="space-y-4 text-lg md:text-xl text-foreground/90 leading-relaxed">
                <p className="animate-fade-in">
                  🎈 One year ago, our lives changed forever when you came into this world. 
                  Every day with you has been a beautiful adventure filled with wonder and joy.
                </p>
                
                <p className="animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
                  From your first cry to your first smile, from your first word to your first steps
                  every moment has been magical. You've taught us what true love really means.
                </p>
                
                <p className="animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
                  Your giggles light up our darkest days, your curiosity inspires us, 
                  and your tiny hugs heal everything. You are our greatest blessing.
                </p>
                
                <div className="pt-6 flex items-center justify-center gap-2 text-2xl font-bold animate-bounce-in" style={{ animationDelay: "0.6s", opacity: 0 }}>
                  <Heart className="w-8 h-8 text-primary fill-primary" />
                  <span>Obrempong loves you to the moon and back</span>
                  <Heart className="w-8 h-8 text-primary fill-primary" />
                </div>
              </div>

              <div className="pt-8 border-t-2 border-primary/20 animate-fade-in" style={{ animationDelay: "0.8s", opacity: 0 }}>
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Happy 1st Birthday, Star 🌟
                </p>
                <p className="text-lg text-muted-foreground italic">
                  May your life be filled with endless happiness, laughter, and love
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CelebrationMessage;
