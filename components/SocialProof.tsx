import React from 'react';
import { Step } from '../types';
import { ArrowRight, Star } from 'lucide-react';

interface SocialProofProps {
  step: Step;
  onNext: () => void;
}

const SocialProof: React.FC<SocialProofProps> = ({ step, onNext }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 fade-in-up z-10 flex flex-col items-center">
      
      {/* Container Principal da Imagem - Design Focado na Mídia */}
      <div className="bg-white p-2 md:p-3 rounded-2xl shadow-2xl mb-8 w-full border border-stone-100">
         <div className="relative w-full rounded-xl overflow-hidden bg-stone-50 min-h-[300px] flex items-center justify-center">
             {step.image ? (
                <img 
                    src={step.image} 
                    alt="Resultado da Aluna" 
                    className="w-full h-auto object-contain max-h-[75vh]"
                    loading="eager"
                    referrerPolicy="no-referrer"
                />
             ) : (
                <div className="flex flex-col items-center justify-center p-10 text-stone-400">
                    <p>Imagem indisponível</p>
                </div>
             )}
         </div>
         <div className="py-2 text-center">
             <p className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold flex items-center justify-center gap-1">
                <Star size={10} className="fill-stone-400" /> Resultado Verificado
             </p>
         </div>
      </div>

      {/* Botão de Ação de Alta Conversão */}
      <button
        onClick={onNext}
        className="w-full md:w-auto bg-green-600 hover:bg-green-500 text-white text-xl font-bold py-5 px-12 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(22,163,74,0.4)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(22,163,74,0.5)] transform active:scale-95"
      >
        <span>{step.buttonLabel || 'QUERO TER ESSES RESULTADOS'}</span>
        <ArrowRight className="w-6 h-6" />
      </button>
      
      <p className="mt-4 text-xs text-stone-500 opacity-70 text-center max-w-md">
        Junte-se a milhares de alunas que estão transformando tecidos em arte todos os dias.
      </p>
    </div>
  );
};

export default SocialProof;