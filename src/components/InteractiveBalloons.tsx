import { useState, useEffect } from "react";

interface Balloon {
  id: number;
  left: number;
  animationDuration: number;
  color: string;
  delay: number;
  size: number;
}

const InteractiveBalloons = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [poppingBalloons, setPoppingBalloons] = useState<Set<number>>(new Set());

  const balloonColors = [
    "from-pink-400 to-pink-600",
    "from-blue-400 to-blue-600",
    "from-yellow-400 to-yellow-600",
    "from-green-400 to-green-600",
    "from-purple-400 to-purple-600",
    "from-red-400 to-red-600",
    "from-orange-400 to-orange-600",
  ];


  useEffect(() => {
    const generateBalloon = () => {
      const newBalloon: Balloon = {
        id: Date.now() + Math.random(),
        left: Math.random() * 90 + 5, 
        animationDuration: Math.random() * 5 + 8, 
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
        delay: 0,
        size: Math.random() * 30 + 50, 
      };
      setBalloons((prev) => [...prev, newBalloon]);
    };

    
    for (let i = 0; i < 5; i++) {
      setTimeout(() => generateBalloon(), i * 1000);
    }

    
    const interval = setInterval(() => {
      generateBalloon();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    const cleanup = setInterval(() => {
      setBalloons((prev) => {
        const now = Date.now();
        return prev.filter((balloon) => {
          const age = (now - balloon.id) / 1000;
          return age < balloon.animationDuration + 2;
        });
      });
    }, 5000);

    return () => clearInterval(cleanup);
  }, []);

  const playPopSound = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const handleBalloonClick = (id: number) => {
    setPoppingBalloons((prev) => new Set(prev).add(id));
    
    
    playPopSound();

    
    setTimeout(() => {
      setBalloons((prev) => prev.filter((balloon) => balloon.id !== id));
      setPoppingBalloons((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 300);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {balloons.map((balloon) => {
        const isPopping = poppingBalloons.has(balloon.id);
        
        return (
          <div
            key={balloon.id}
            className="absolute pointer-events-auto cursor-pointer transition-all duration-300"
            style={{
              left: `${balloon.left}%`,
              bottom: "-100px",
              animation: isPopping 
                ? "pop 0.3s ease-out forwards"
                : `float-up ${balloon.animationDuration}s linear forwards`,
              animationDelay: `${balloon.delay}s`,
            }}
            onClick={() => handleBalloonClick(balloon.id)}
          >
            
            <div
              className={`relative bg-gradient-to-br ${balloon.color} rounded-full shadow-lg hover:scale-110 transition-transform duration-200`}
              style={{
                width: `${balloon.size}px`,
                height: `${balloon.size * 1.15}px`,
                transform: isPopping ? "scale(0)" : "scale(1)",
              }}
            >
              
              <div className="absolute top-2 left-2 w-4 h-6 bg-white/40 rounded-full blur-sm" />
              
              
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gray-400"
                style={{ height: `${balloon.size * 0.8}px` }}
              />
              
              
              <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-500 rounded-full" style={{ bottom: `-${balloon.size * 0.8}px` }} />
            </div>

            
            {isPopping && (
              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute top-1/2 left-1/2 w-2 h-2 bg-gradient-to-br ${balloon.color} rounded-full`}
                    style={{
                      animation: `particle-burst 0.3s ease-out forwards`,
                      transform: `rotate(${i * 60}deg) translateY(-20px)`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default InteractiveBalloons;
