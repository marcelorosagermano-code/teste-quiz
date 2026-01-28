import React, { useEffect, useState } from 'react';
import { Check, Sparkles, Zap, Brain, Ruler } from 'lucide-react';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  // Configuration of stages based on progress percentage
  const stages = [
    { threshold: 0, text: "Conectando ao banco de dados...", icon: Zap },
    { threshold: 25, text: "Analisando seu perfil de costura...", icon: Brain },
    { threshold: 55, text: "Identificando dificuldades...", icon: Ruler },
    { threshold: 80, text: "Personalizando seu plano de moldes...", icon: Sparkles },
    { threshold: 100, text: "Plano concluído com sucesso!", icon: Check }
  ];

  useEffect(() => {
    const duration = 4500; // 4.5 seconds total
    const intervalTime = 40;
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(100, Math.round((currentStep / totalSteps) * 100));
      
      setProgress(newProgress);

      // Determine current stage based on progress
      // We find the last stage whose threshold is less than or equal to current progress
      const stageIndex = stages.reduce((acc, stage, index) => {
        return newProgress >= stage.threshold ? index : acc;
      }, 0);
      
      setCurrentStage(stageIndex);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setTimeout(onComplete, 600); // Small delay at 100% before switching
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // SVG Circle calculations
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center max-w-xl mx-auto text-center px-6 fade-in-up">
      
      {/* Central Progress Circle */}
      <div className="relative w-48 h-48 mb-12">
        {/* Background Blur Glow */}
        <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full animate-pulse"></div>
        
        <div className="relative w-full h-full bg-white rounded-full shadow-2xl flex items-center justify-center p-2 ring-1 ring-stone-100">
           {/* SVG Progress Ring */}
           <svg className="w-full h-full transform -rotate-90">
             {/* Track */}
             <circle
               cx="50%"
               cy="50%"
               r={radius}
               className="stroke-stone-100 fill-transparent"
               strokeWidth="8"
             />
             {/* Indicator */}
             <circle
               cx="50%"
               cy="50%"
               r={radius}
               className="stroke-rose-500 fill-transparent transition-all duration-300 ease-out"
               strokeWidth="8"
               strokeDasharray={circumference}
               strokeDashoffset={strokeDashoffset}
               strokeLinecap="round"
               style={{ filter: 'drop-shadow(0 0 4px rgba(244, 63, 94, 0.5))' }}
             />
           </svg>

           {/* Center Text */}
           <div className="absolute inset-0 flex flex-col items-center justify-center">
             <span className="text-4xl font-bold text-slate-800 font-serif">
               {progress}%
             </span>
             <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">
               Processando
             </span>
           </div>
        </div>
      </div>
      
      {/* Dynamic Title */}
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-800 mb-2 transition-all duration-300">
        Construindo seu Plano
      </h2>
      <p className="text-slate-500 mb-10 h-6">
        Nossa IA está analisando {progress > 0 ? 'suas respostas' : '...'}
      </p>
      
      {/* Steps List */}
      <div className="w-full max-w-sm mx-auto space-y-3 relative">
        {stages.slice(1, -1).map((stage, index) => {
          // Adjust index to match the "processing" stages (skipping index 0 which is just "connecting")
          const isActive = index + 1 === currentStage;
          const isCompleted = index + 1 < currentStage;
          const Icon = stage.icon;

          return (
            <div 
              key={index} 
              className={`flex items-center space-x-4 p-3 rounded-xl border transition-all duration-500 ${
                isActive 
                  ? 'bg-white border-rose-200 shadow-lg scale-105 z-10' 
                  : isCompleted 
                    ? 'bg-stone-50 border-transparent opacity-60' 
                    : 'bg-transparent border-transparent opacity-30 blur-[1px]'
              }`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 ${
                 isCompleted ? 'bg-green-100 text-green-600' : 
                 isActive ? 'bg-rose-100 text-rose-600 shadow-sm' : 'bg-stone-100 text-stone-300'
              }`}>
                {isCompleted ? (
                  <Check size={14} strokeWidth={3} />
                ) : (
                  <Icon size={16} className={isActive ? 'animate-pulse' : ''} />
                )}
              </div>
              <span className={`text-sm font-medium transition-colors ${
                isActive ? 'text-rose-600' : isCompleted ? 'text-slate-600' : 'text-slate-400'
              }`}>
                {stage.text}
              </span>
              
              {isActive && (
                 <div className="ml-auto">
                    <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></div>
                 </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoadingScreen;