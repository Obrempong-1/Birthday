import { useEffect, useState } from "react";

const ConfettiEffect = () => {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; color: string }>>([]);

  useEffect(() => {
    const colors = [
      "hsl(340, 82%, 67%)", 
      "hsl(200, 95%, 65%)", 
      "hsl(45, 100%, 70%)", 
      "hsl(165, 70%, 65%)", 
    ];

    const newConfetti = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setConfetti(newConfetti);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 opacity-70 animate-confetti"
          style={{
            left: `${piece.left}%`,
            top: "-20px",
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;
