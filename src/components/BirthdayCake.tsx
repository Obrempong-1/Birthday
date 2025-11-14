import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const BirthdayCake = () => {
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  const [showWish, setShowWish] = useState(false);
  const { toast } = useToast();

  const blowOutCandle = (index: number) => {
    if (!candlesLit[index]) return;

    const newCandles = [...candlesLit];
    newCandles[index] = false;
    setCandlesLit(newCandles);

    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 200;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);

    toast({
      title: "Poof! 💨",
      description: "Candle blown out!",
    });

    
    if (newCandles.every(candle => !candle)) {
      setTimeout(() => {
        setShowWish(true);
        toast({
          title: "🎉 Make a wish 🎉",
          description: "All candles are out",
        });
      }, 500);
    }
  };

  const resetCake = () => {
    setCandlesLit([true, true, true]);
    setShowWish(false);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" id="birthday-cake">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Blow Out The Candles
          </h2>
          <p className="text-pink-500 font-bold text-2xl">
            Click on each candle to blow it out and make a wish
          </p>

        </div>

        <Card className="p-8 sm:p-12 bg-gradient-to-br from-card to-card/50 relative overflow-hidden">
          
          <div className="absolute top-4 right-4 text-primary/20 animate-pulse">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="absolute bottom-4 left-4 text-secondary/20 animate-pulse" style={{ animationDelay: '1s' }}>
            <Sparkles className="w-8 h-8" />
          </div>

          
          <div className="flex flex-col items-center gap-8">
            
            <div className="flex gap-8 mb-4">
              {candlesLit.map((isLit, index) => (
                <button
                  key={index}
                  onClick={() => blowOutCandle(index)}
                  className="relative group transition-transform hover:scale-110 focus:outline-none"
                  disabled={!isLit}
                >
                 
                  {isLit && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-float">
                      <div className="w-6 h-8 bg-gradient-to-t from-yellow-400 via-orange-400 to-red-500 rounded-full blur-sm opacity-80" />
                      <div className="absolute inset-0 w-6 h-8 bg-gradient-to-t from-yellow-300 via-orange-300 to-red-400 rounded-full" />
                    </div>
                  )}
                  
                  
                  {!isLit && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-float-up opacity-50">
                      <div className="w-4 h-8 bg-gradient-to-t from-muted/50 to-transparent rounded-full blur-sm" />
                    </div>
                  )}

                  
                  <div className={`w-8 h-24 rounded-t-full transition-all ${
                    isLit 
                      ? 'bg-gradient-to-b from-pink-400 to-pink-500 shadow-glow' 
                      : 'bg-gradient-to-b from-muted to-muted-foreground/30'
                  }`}>
                    <div className="w-full h-2 bg-foreground/20 rounded-full mt-2" />
                  </div>

                  
                  {isLit && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground whitespace-nowrap">
                      Click to blow
                    </div>
                  )}
                </button>
              ))}
            </div>

            
            <div className="relative group">
              
              <div className="w-64 h-16 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 rounded-t-3xl shadow-elegant relative overflow-hidden transition-transform hover:scale-105">
                
                <div className="absolute inset-0 opacity-50">
                  <div className="absolute top-1 left-4 w-8 h-8 bg-white/40 rounded-full blur-sm" />
                  <div className="absolute top-1 right-4 w-8 h-8 bg-white/40 rounded-full blur-sm" />
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-10 bg-white/40 rounded-full blur-sm" />
                </div>
                
                <div className="absolute inset-0">
                  <div className="absolute top-3 left-8 w-1 h-3 bg-red-400 rounded-full rotate-45" />
                  <div className="absolute top-4 left-16 w-1 h-3 bg-blue-400 rounded-full -rotate-12" />
                  <div className="absolute top-3 right-12 w-1 h-3 bg-yellow-400 rounded-full rotate-12" />
                  <div className="absolute top-5 right-20 w-1 h-3 bg-green-400 rounded-full -rotate-45" />
                  <div className="absolute top-2 left-1/2 w-1 h-3 bg-pink-300 rounded-full rotate-90" />
                </div>
                <div className="absolute inset-x-4 bottom-2 h-3 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 rounded-full" />
              </div>
              
              
              <div className="w-72 h-20 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-700 shadow-elegant relative overflow-hidden transition-transform hover:scale-105">
                
                <div className="absolute inset-x-6 top-1 h-4 bg-gradient-to-r from-yellow-100 via-white to-yellow-100 rounded-full opacity-90" />
                
                <div className="absolute top-8 left-12 w-2 h-2 bg-amber-900 rounded-full" />
                <div className="absolute top-6 left-20 w-2 h-2 bg-amber-900 rounded-full" />
                <div className="absolute top-10 right-16 w-2 h-2 bg-amber-900 rounded-full" />
                <div className="absolute top-7 right-24 w-2 h-2 bg-amber-900 rounded-full" />
                
                <div className="absolute inset-x-4 bottom-1 h-2 bg-yellow-100 rounded-full" />
                <div className="absolute bottom-0 left-8 w-6 h-6 bg-yellow-100 rounded-full blur-sm opacity-60" />
                <div className="absolute bottom-0 right-8 w-6 h-6 bg-yellow-100 rounded-full blur-sm opacity-60" />
              </div>
              
              
              <div className="w-80 h-24 bg-gradient-to-br from-rose-400 via-pink-400 to-rose-400 rounded-b-3xl shadow-elegant relative overflow-hidden transition-transform hover:scale-105">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-4 left-8 w-3 h-4 bg-red-600 rounded-b-full" />
                  <div className="absolute top-6 left-16 w-3 h-4 bg-red-600 rounded-b-full" />
                  <div className="absolute top-8 right-16 w-3 h-4 bg-red-600 rounded-b-full" />
                  <div className="absolute top-5 right-24 w-3 h-4 bg-red-600 rounded-b-full" />
                </div>
                <div className="absolute inset-x-6 top-2 h-3 bg-gradient-to-r from-white/0 via-white/80 to-white/0 rounded-full" />
                <div className="absolute inset-x-8 top-6 h-2 bg-white/60 rounded-full" />
                <div className="absolute inset-x-10 top-10 h-2 bg-white/60 rounded-full" />
                <div className="absolute bottom-2 left-12 w-8 h-8 bg-white/40 rounded-full blur-sm" />
                <div className="absolute bottom-2 right-12 w-8 h-8 bg-white/40 rounded-full blur-sm" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/40 rounded-full blur-sm" />
              </div>
              <div className="w-96 h-4 bg-gradient-to-r from-muted via-primary/20 to-muted rounded-full mx-auto mt-2 shadow-lg" />
              <div className="w-[400px] h-2 bg-gradient-to-r from-transparent via-primary/10 to-transparent rounded-full mx-auto mt-1" />
            </div>

            
            {showWish && (
              <div className="mt-8 animate-scale-in text-center space-y-4">
                <div className="text-4xl animate-bounce-in">🎉✨🎂✨🎉</div>
                <div className="bg-gradient-primary bg-clip-text text-transparent text-2xl sm:text-3xl font-bold animate-fade-in">
                  Happy 1st Birthday, Nana Yaw
                </div>
                <p className="text-lg text-foreground animate-fade-in max-w-md mx-auto" style={{ animationDelay: '0.2s' }}>
                  Our precious little superstar, watching you grow this past year has been the greatest joy 
                  May your life be filled with endless giggles, magical moments, and all the love in the world. 
                  You make every day brighter, Nana Yaw 💖✨
                </p>
                <button
                  onClick={resetCake}
                  className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-transform animate-fade-in"
                  style={{ animationDelay: '0.4s' }}
                >
                  Light Candles Again
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default BirthdayCake;
