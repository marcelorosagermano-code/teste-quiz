import React, { useState, useEffect } from 'react';
import { STEPS } from './constants';
import QuestionCard from './components/QuestionCard';
import SocialProof from './components/SocialProof';
import ProgressBar from './components/ProgressBar';
import LoadingScreen from './components/LoadingScreen';
import SalesPage from './components/SalesPage';
import AdminDashboard from './components/AdminDashboard'; // Import Dashboard
import { QuizState } from './types';
import { Play, Sparkles, ArrowRight } from 'lucide-react';
import { trackEvent } from './utils/analytics'; // Import Analytics

const App: React.FC = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [adminClickCount, setAdminClickCount] = useState(0);

  const [quizState, setQuizState] = useState<QuizState>({
    currentStepIndex: 0,
    answers: {},
    isAnalyzing: false,
    isComplete: false,
    score: 0,
  });

  // Track initial visit
  useEffect(() => {
    trackEvent('visit', 'intro', 0);
  }, []);

  const currentStep = STEPS[quizState.currentStepIndex];
  
  const progress = Math.min(100, Math.round(((quizState.currentStepIndex) / (STEPS.length - 1)) * 100));

  // Handle Admin Access (Secret Click)
  const handleFooterClick = () => {
    const newCount = adminClickCount + 1;
    setAdminClickCount(newCount);
    if (newCount >= 5) {
      setShowDashboard(true);
      setAdminClickCount(0);
    }
  };

  const handleAnswer = (optionId: string) => {
    // Track step completion
    trackEvent('step_complete', currentStep.id, quizState.currentStepIndex, { answer: optionId });

    setQuizState((prev) => {
      const selectedOption = currentStep.options?.find(o => o.id === optionId);
      const pointsToAdd = selectedOption?.score || 0;
      
      const newAnswers = { ...prev.answers, [currentStep.id]: optionId };
      const newScore = prev.score + pointsToAdd;
      const nextIndex = prev.currentStepIndex + 1;

      // Track next step view
      if (nextIndex < STEPS.length) {
         trackEvent('step_view', STEPS[nextIndex].id, nextIndex);
      }

      if (nextIndex >= STEPS.length) {
        return { ...prev, answers: newAnswers, score: newScore, isAnalyzing: true };
      }

      return { ...prev, answers: newAnswers, score: newScore, currentStepIndex: nextIndex };
    });
  };

  const handleInput = (value: string) => {
    // Track Lead Capture
    if (currentStep.inputType === 'email' || currentStep.inputType === 'text') {
        trackEvent('lead_captured', currentStep.id, quizState.currentStepIndex, { value });
    }

    setQuizState((prev) => {
      const nextIndex = prev.currentStepIndex + 1;
      const newAnswers = { ...prev.answers, [currentStep.id]: value };
      const newUserName = currentStep.id === 'name' ? value : prev.userName;

      // Track next step view
      if (nextIndex < STEPS.length) {
         trackEvent('step_view', STEPS[nextIndex].id, nextIndex);
      }

      if (nextIndex >= STEPS.length) {
        return { ...prev, answers: newAnswers, userName: newUserName, isAnalyzing: true };
      }

      return { ...prev, answers: newAnswers, userName: newUserName, currentStepIndex: nextIndex };
    });
  };

  const handleNext = () => {
    // Track simple next click (for social proof or intro)
    trackEvent('step_complete', currentStep.id, quizState.currentStepIndex);

    setQuizState((prev) => {
      const nextIndex = prev.currentStepIndex + 1;
      
      // Track next step view
      if (nextIndex < STEPS.length) {
         trackEvent('step_view', STEPS[nextIndex].id, nextIndex);
      }

      if (nextIndex >= STEPS.length) {
        return { ...prev, isAnalyzing: true };
      }
      return { ...prev, currentStepIndex: nextIndex };
    });
  };

  const handleAnalysisComplete = () => {
    setQuizState((prev) => ({ ...prev, isAnalyzing: false, isComplete: true }));
    trackEvent('step_view', 'sales_page', 999);
  };

  // Dynamic Background Component
  const Background = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/30 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-200/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-amber-100/40 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '4s' }}></div>
    </div>
  );

  // Render Dashboard if active
  if (showDashboard) {
      return <AdminDashboard onClose={() => setShowDashboard(false)} />;
  }

  // Render Landing/Intro
  if (currentStep.type === 'intro') {
    return (
      <div className="h-[100dvh] w-full flex flex-col md:flex-row items-center justify-center p-0 md:p-4 relative bg-stone-50 md:bg-transparent overflow-hidden">
        <Background />
        
        {/* Main Card Container */}
        <div className="w-full h-full md:h-auto md:max-w-6xl md:glass md:rounded-[2.5rem] md:shadow-2xl flex flex-col md:flex-row relative z-10 md:border border-white/60 overflow-hidden">
          
          {/* Image Section */}
          <div className="h-[40%] md:h-auto md:min-h-[600px] md:w-1/2 relative shrink-0 overflow-hidden group">
             <img 
                src={currentStep.image} 
                alt="Sewing intro" 
                className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-900/10"></div>
          </div>

          {/* Content Section */}
          <div className="h-[60%] md:h-auto md:w-1/2 flex flex-col bg-white md:bg-white/60 backdrop-blur-sm -mt-8 md:mt-0 rounded-t-[2.5rem] md:rounded-none relative z-10 px-6 pt-10 pb-6 md:p-16 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-none">
            
            <div className="flex-1 flex flex-col justify-center overflow-y-auto">
                <h1 className="text-3xl md:text-6xl font-serif font-bold text-slate-900 mb-4 md:mb-6 leading-tight">
                  {currentStep.title}
                </h1>
                <p className="text-base md:text-xl text-slate-600 mb-6 md:mb-10 leading-relaxed font-light">
                  {currentStep.subtitle}
                </p>
                
                <button 
                  onClick={handleNext}
                  className="group bg-slate-900 hover:bg-rose-600 text-white text-lg md:text-xl font-bold py-4 md:py-5 px-8 md:px-10 rounded-2xl shadow-xl hover:shadow-rose-500/30 transition-all duration-300 flex items-center justify-center space-x-3 w-full md:w-auto transform hover:-translate-y-1 mb-2"
                >
                  <span>Começar Avaliação</span>
                  <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                </button>
            </div>
            
            <div className="shrink-0 pt-4 mt-2 border-t border-slate-100 flex items-center justify-center gap-3 md:justify-start">
                <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                             <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <p className="text-xs text-slate-500 font-medium whitespace-nowrap">
                  Junte-se a <span className="font-bold text-slate-900">3.000+ costureiras</span> hoje
                </p>
            </div>

          </div>
        </div>
        
        {/* Hidden Trigger for Dashboard on Intro Page */}
        <div 
             onClick={handleFooterClick}
             className="absolute bottom-1 right-4 p-2 text-[10px] text-slate-400 opacity-50 cursor-pointer select-none z-50 hover:opacity-100"
        >
             Moldes Mágicos &copy; 2024
        </div>
      </div>
    );
  }

  // Render Sales Page
  if (quizState.isComplete) {
    return (
      <div className="min-h-screen relative bg-stone-50">
        <Background />
        {/* We wrap SalesPage to capture clicks on it if needed, or modify SalesPage to emit event */}
        <div onClick={() => trackEvent('checkout_click', 'sales_cta', 1000)}>
            <SalesPage 
            score={quizState.score} 
            userName={quizState.userName} 
            answers={quizState.answers} 
            />
        </div>
        
        {/* Hidden Trigger for Dashboard on Sales Page */}
        <div 
             onClick={handleFooterClick}
             className="fixed bottom-1 right-4 p-2 text-[10px] text-slate-400 opacity-50 cursor-pointer select-none z-50 hover:opacity-100"
        >
             Moldes Mágicos &copy; 2024
        </div>
      </div>
    );
  }

  // Render Loading Screen
  if (quizState.isAnalyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <Background />
        <LoadingScreen onComplete={handleAnalysisComplete} />
      </div>
    );
  }

  // Render Main Quiz Flow
  return (
    <div className="h-[100dvh] flex flex-col items-center py-4 relative overflow-hidden">
      <Background />
      
      {/* Header / Progress */}
      <div className="w-full max-w-2xl px-6 mb-2 shrink-0 z-20">
        <div className="flex justify-between items-center mb-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
          <span>Sua Jornada</span>
          <span>{progress}%</span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      {/* Content Area */}
      <div className="w-full flex-grow flex flex-col justify-start md:justify-center overflow-y-auto z-10 pb-20 px-4 md:pb-8 scroll-smooth">
        <div className="my-auto w-full">
            {currentStep.type === 'question' && (
            <QuestionCard 
                step={currentStep} 
                onSelect={handleAnswer} 
            />
            )}
            
            {currentStep.type === 'social-proof' && (
            <SocialProof 
                step={currentStep} 
                onNext={handleNext} 
            />
            )}

            {currentStep.type === 'input' && (
            <div className="w-full max-w-xl mx-auto z-10 fade-in-up">
                <div className="glass rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden text-center border border-white/60">
                <div className="relative z-10">
                    {currentStep.title && (
                        <h3 className="text-rose-600 font-bold uppercase tracking-[0.2em] text-xs mb-4">
                        {currentStep.title}
                        </h3>
                    )}
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-800 mb-8 leading-tight">
                        {currentStep.subtitle}
                    </h2>
                    
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const input = e.currentTarget.elements.namedItem('inputField') as HTMLInputElement;
                        if(input.value.trim()) handleInput(input.value);
                    }}>
                        <input 
                            name="inputField"
                            type={currentStep.inputType || 'text'}
                            placeholder={currentStep.placeholder} 
                            className="w-full bg-white/80 border border-stone-200 rounded-2xl px-6 py-5 text-xl outline-none focus:ring-2 focus:ring-rose-400 mb-8 shadow-inner transition-all"
                            autoFocus
                        />
                        <button 
                            type="submit"
                            className="w-full bg-slate-900 text-white text-xl font-bold py-5 px-8 rounded-2xl hover:bg-rose-600 transition-all duration-300 shadow-xl flex items-center justify-center space-x-3 transform hover:-translate-y-1"
                        >
                            <span>{currentStep.buttonLabel || 'Continuar'}</span>
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </form>
                </div>
                </div>
            </div>
            )}
        </div>
      </div>

      {/* Footer Branding - Secret Trigger */}
      <div className="fixed bottom-0 w-full py-3 text-center z-20 bg-gradient-to-t from-stone-50 via-stone-50/80 to-transparent">
        <p 
            onClick={handleFooterClick}
            className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase opacity-70 cursor-pointer hover:text-rose-500 transition-colors"
        >
            Moldes Mágicos &copy; 2024
        </p>
      </div>
    </div>
  );
};

export default App;