import React, { useState, useEffect } from 'react';
import { MapPin, Sparkles } from 'lucide-react';

const NOTIFICATIONS = [
  { name: 'Ana Silva', location: 'São Paulo, SP' },
  { name: 'Mariana Costa', location: 'Rio de Janeiro, RJ' },
  { name: 'Patrícia Souza', location: 'Belo Horizonte, MG' },
  { name: 'Fernanda Lima', location: 'Curitiba, PR' },
  { name: 'Juliana Alves', location: 'Salvador, BA' },
  { name: 'Camila Rocha', location: 'Porto Alegre, RS' },
  { name: 'Beatriz Santos', location: 'Recife, PE' },
  { name: 'Larissa Dias', location: 'Brasília, DF' },
  { name: 'Roberta Martins', location: 'Fortaleza, CE' },
  { name: 'Sônia Pereira', location: 'Campinas, SP' }
];

const SocialNotification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentData, setCurrentData] = useState(NOTIFICATIONS[0]);

  useEffect(() => {
    // Função para mostrar a notificação
    const showNotification = () => {
      // Escolher dados aleatórios
      const randomData = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
      setCurrentData(randomData);
      setIsVisible(true);

      // Esconder após 5 segundos
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Primeira aparição rápida para engajamento (10s), depois entra no loop de 40s
    const initialTimer = setTimeout(showNotification, 10000);

    // Loop de 40 segundos
    const interval = setInterval(showNotification, 40000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div 
      className={`fixed top-4 right-4 md:top-8 md:right-8 z-[100] transition-all duration-700 transform ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-8 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border border-stone-100 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-2xl p-4 pr-6 flex items-center gap-4 max-w-[320px] ring-1 ring-black/5">
        
        {/* Ícone/Avatar */}
        <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center border border-rose-100 shadow-inner">
                <span className="font-serif font-bold text-rose-600 text-sm">
                    {currentData.name.charAt(0)}
                </span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white animate-pulse"></div>
        </div>

        {/* Texto */}
        <div className="flex flex-col">
            <p className="text-xs font-bold text-slate-800 leading-tight">
                {currentData.name}
            </p>
            <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium mt-0.5">
                <MapPin size={10} className="text-rose-400" />
                <span>{currentData.location}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
                <Sparkles size={10} className="text-amber-400 fill-amber-400" />
                <span className="text-[10px] text-slate-600 font-semibold">
                    Acabou de gerar seu plano
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SocialNotification;