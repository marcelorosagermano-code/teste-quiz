import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  animationDelay: number;
  animationDuration: number;
  backgroundColor: string;
  size: number;
  rotation: number;
  shape: 'circle' | 'square';
}

const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = ['#f43f5e', '#3b82f6', '#fbbf24', '#10b981', '#8b5cf6', '#ec4899'];
    const pieceCount = 70; // Quantidade de confetes

    const newPieces = Array.from({ length: pieceCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Posição horizontal aleatória
      animationDelay: Math.random() * 1.5, // Atraso aleatório para parecer natural
      animationDuration: 2.5 + Math.random() * 2, // Velocidade de queda variada
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 8, // Tamanho variado
      rotation: Math.random() * 360,
      shape: Math.random() > 0.5 ? 'circle' : 'square' as 'circle' | 'square',
    }));

    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <style>
        {`
          @keyframes confetti-fall {
            0% { transform: translateY(-10vh) rotate(0deg) translateX(0); opacity: 1; }
            25% { transform: translateY(25vh) rotate(90deg) translateX(20px); }
            50% { transform: translateY(50vh) rotate(180deg) translateX(-20px); }
            75% { transform: translateY(75vh) rotate(270deg) translateX(10px); }
            100% { transform: translateY(110vh) rotate(360deg) translateX(0); opacity: 0; }
          }
        `}
      </style>
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: '-20px',
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.backgroundColor,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            animation: `confetti-fall ${p.animationDuration}s linear forwards`,
            animationDelay: `${p.animationDelay}s`,
            transform: `rotate(${p.rotation}deg)`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;