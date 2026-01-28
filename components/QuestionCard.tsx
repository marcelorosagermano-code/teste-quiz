import React from 'react';
import { Step } from '../types';

interface QuestionCardProps {
  step: Step;
  onSelect: (optionId: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ step, onSelect }) => {
  const hasImages = step.options?.some(o => o.image);
  
  return (
    <div className="w-full max-w-2xl mx-auto z-10 pb-4">
      <div className="glass rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden transition-all duration-300 border border-white/60">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-300/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
        
        <div className="relative z-10 text-center mb-8">
          {step.title && (
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 mb-4 backdrop-blur-sm shadow-sm">
                <span className="text-rose-600 font-bold uppercase tracking-[0.2em] text-[10px]">
                {step.title}
                </span>
            </div>
          )}
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-800 leading-tight drop-shadow-sm">
            {step.subtitle}
          </h2>
        </div>

        <div className={`flex flex-col gap-4 ${hasImages ? 'md:grid md:grid-cols-2 md:gap-6' : ''}`}>
          {step.options?.map((option, index) => {
             const Icon = option.icon;

             // Layout for Image Options (Grid) - Large Images Restored
             if (hasImages) {
                 return (
                  <button
                    key={option.id}
                    onClick={() => onSelect(option.id)}
                    className="group relative flex flex-col items-center p-3 pb-5 rounded-2xl bg-white border-2 border-stone-100 shadow-sm hover:shadow-2xl hover:shadow-rose-500/10 hover:border-rose-400 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 overflow-hidden text-center fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-full aspect-[4/3] mb-4 rounded-xl overflow-hidden shadow-inner relative bg-stone-100">
                        <img 
                            src={option.image} 
                            alt={option.label} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-rose-900/0 group-hover:bg-rose-900/10 transition-colors duration-300"></div>
                    </div>
                    <span className="font-bold text-slate-700 text-base md:text-lg px-2 group-hover:text-rose-600 transition-colors leading-tight">
                        {option.label}
                    </span>
                  </button>
                 )
             }

             // Layout for Text Options (List/Stack) - Spacious and Clickable
             return (
              <button
                key={option.id}
                onClick={() => onSelect(option.id)}
                className="group w-full relative flex items-center p-4 md:p-5 rounded-2xl bg-white border-2 border-stone-100 shadow-sm hover:shadow-xl hover:shadow-rose-200/40 hover:border-rose-400 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] text-left fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Emoji injection: Displayed first if present */}
                {option.emoji && (
                    <div className="mr-4 md:mr-5 text-3xl animate-bounce-slow">
                        {option.emoji}
                    </div>
                )}

                {/* Icon & Text */}
                <div className="flex-grow flex items-center">
                    {Icon && !option.emoji && (
                         <div className="mr-4 md:mr-5 w-10 h-10 md:w-12 md:h-12 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-400 group-hover:bg-rose-100 group-hover:text-rose-600 group-hover:border-rose-200 transition-all duration-300 shrink-0">
                             <Icon size={20} strokeWidth={2.5} />
                         </div>
                    )}
                    <span className="font-bold text-slate-600 text-base md:text-lg leading-snug group-hover:text-slate-900 transition-colors">
                        {option.label}
                    </span>
                </div>

                {/* Arrow on Hover */}
                <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-rose-500 hidden md:block">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;