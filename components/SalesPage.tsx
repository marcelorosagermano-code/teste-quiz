import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { 
  ShieldCheck, Clock, Scissors, Trophy, ArrowRight, Star, 
  TrendingUp, CheckCircle2, Zap, Target, Heart
} from 'lucide-react';
import Confetti from './Confetti';
import SocialNotification from './SocialNotification';

const data = [
  { name: 'Hoje', value: 15 },
  { name: '10 Dias', value: 45 },
  { name: '20 Dias', value: 80 },
  { name: '30 Dias', value: 100 },
];

interface SalesPageProps {
  score?: number;
  userName?: string;
  answers?: Record<string, string>;
}

const SalesPage: React.FC<SalesPageProps> = ({ score = 0, userName, answers = {} }) => {
  const firstName = userName ? userName.split(' ')[0] : 'Costureira';

  // Helper to get dynamic content based on answers
  const getMatches = () => {
    const matches = [];
    
    // Objective Match
    if (answers['objective'] === 'income') {
      matches.push({
        label: 'Seu Objetivo: Renda Extra',
        solution: 'Incluímos o Módulo de Vendas & Precificação',
        icon: TrendingUp
      });
    } else if (answers['objective'] === 'personal') {
      matches.push({
        label: 'Seu Objetivo: Família',
        solution: 'Selecionamos tecidos confortáveis e hipoalergênicos',
        icon: Heart
      });
    } else {
        matches.push({
        label: 'Seu Objetivo: Terapia',
        solution: 'Foco em costura criativa e anti-stress',
        icon: Star
      });
    }

    // Experience Match
    if (answers['experience'] === 'beginner') {
      matches.push({
        label: 'Nível: Iniciante',
        solution: 'Acesso liberado às Aulas do Zero (Passo a Passo)',
        icon: Zap
      });
    } else {
      matches.push({
        label: 'Nível: Com Experiência',
        solution: 'Moldes Profissionais de Alta Complexidade Inclusos',
        icon: Scissors
      });
    }

    // Pain Point Match
    if (answers['feelings'] === 'fit') {
      matches.push({
        label: 'Dificuldade: Tamanhos',
        solution: 'Tabela ABNT Testada: Adeus ajustes chatos!',
        icon: Target
      });
    } else {
       matches.push({
        label: 'Dificuldade: Modelagem',
        solution: 'Moldes Prontos para Imprimir e Cortar',
        icon: Clock
      });
    }

    return matches;
  };

  const matches = getMatches();

  return (
    <>
      <style>{`
        @keyframes subtle-pulse {
          0% { transform: scale(1); box-shadow: 0 25px 60px -12px rgba(225, 29, 72, 0.4); }
          50% { transform: scale(1.03); box-shadow: 0 35px 70px -12px rgba(225, 29, 72, 0.6); }
          100% { transform: scale(1); box-shadow: 0 25px 60px -12px rgba(225, 29, 72, 0.4); }
        }
        .animate-subtle-pulse {
          animation: subtle-pulse 2.5s infinite ease-in-out;
        }
      `}</style>

      {/* Elements fixed to viewport must be outside transformed containers */}
      <SocialNotification />
      <Confetti />

      <div className="fade-in-up w-full max-w-[1600px] mx-auto md:pb-20 md:px-8">
        {/* Hero Section */}
        <div className="glass rounded-none md:rounded-[2.5rem] shadow-none md:shadow-2xl overflow-hidden mb-0 md:mb-10 border-0 md:border border-white/60">
          <div className="bg-slate-900 text-white px-6 py-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
              <div className="relative z-10">
                  <span className="inline-block py-1 px-3 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-300 text-sm font-bold tracking-widest uppercase mb-6">
                      Análise Concluída com Sucesso
                  </span>
                  <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-tight">
                      {firstName}, seu plano de costura <span className="text-rose-400">está pronto!</span>
                  </h1>
                  <p className="text-xl md:text-3xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
                      Baseado nas suas respostas, criamos o caminho perfeito para você sair do zero e criar peças incríveis em menos de 30 dias.
                  </p>
              </div>
          </div>

          <div className="bg-white/95 px-0 py-8 md:p-16">
              
              {/* --- COMPATIBILITY SECTION --- */}
              <div className="w-full max-w-5xl mx-auto mb-20 px-4 md:px-0">
                  <div className="bg-white border-2 border-green-100 rounded-3xl p-6 pt-16 md:p-12 shadow-xl relative overflow-hidden">
                      {/* Badge */}
                      <div className="absolute top-0 right-0 bg-green-500 text-white text-sm font-bold px-6 py-3 rounded-bl-2xl shadow-md z-20 flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-white" />
                          97.8% COMPATÍVEL
                      </div>
                      {/* Decorative Blur */}
                      <div className="absolute top-0 right-0 w-48 h-48 bg-green-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                      <div className="text-center md:text-left mb-12 relative z-10">
                          <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 flex flex-col md:flex-row items-center justify-center md:justify-start gap-3">
                              Análise de Compatibilidade
                          </h3>
                          <p className="text-slate-500 mt-4 text-lg md:text-xl max-w-3xl mx-auto md:mx-0">
                              Cruzamos suas respostas com nossa metodologia e encontramos o match perfeito para o seu momento atual.
                          </p>
                      </div>

                      <div className="space-y-6 relative z-10">
                          {matches.map((match, index) => {
                              const Icon = match.icon;
                              return (
                                  <div key={index} className="flex flex-col md:flex-row items-center bg-stone-50 rounded-2xl p-6 border border-stone-100 gap-4 md:gap-8 shadow-sm hover:shadow-md transition-shadow">
                                      <div className="shrink-0 w-full md:w-auto text-center md:text-left">
                                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                                              Seu Perfil
                                          </span>
                                          <span className="font-semibold text-slate-700 bg-white px-5 py-2.5 rounded-xl border border-stone-200 inline-block shadow-sm text-base">
                                              {match.label}
                                          </span>
                                      </div>
                                      
                                      <div className="hidden md:block text-stone-300">
                                          <ArrowRight size={24} />
                                      </div>
                                      <div className="md:hidden text-stone-300 rotate-90">
                                          <ArrowRight size={24} />
                                      </div>

                                      <div className="flex-grow flex items-center gap-5 w-full bg-white md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none border border-stone-100 md:border-none">
                                          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                              <Icon size={28} strokeWidth={2} />
                                          </div>
                                          <div className="text-left">
                                              <span className="text-xs font-bold text-green-600 uppercase tracking-wider block mb-1">
                                                  Solução Inclusa
                                              </span>
                                              <span className="font-bold text-slate-800 text-lg md:text-2xl leading-tight block">
                                                  {match.solution}
                                              </span>
                                          </div>
                                      </div>
                                      
                                      <div className="hidden md:block shrink-0 text-green-500">
                                          <CheckCircle2 className="fill-green-100 w-8 h-8" />
                                      </div>
                                  </div>
                              );
                          })}
                      </div>
                  </div>
              </div>
              {/* --- END COMPATIBILITY SECTION --- */}

              {/* EVOLUTION CHART SECTION */}
              <div className="w-full max-w-7xl mx-auto">
                  <div className="bg-transparent md:bg-white md:rounded-[2.5rem] px-4 md:p-14 md:shadow-xl md:border border-stone-100 mb-16 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60 pointer-events-none hidden md:block"></div>
                      
                      <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20 relative z-10">
                          {/* Left: Chart */}
                          <div className="w-full lg:w-3/5">
                              <div className="mb-8 md:mb-10 text-left">
                                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                                      <TrendingUp size={14} /> Projeção Personalizada
                                  </div>
                                  <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-800 mb-4">
                                      Sua Curva de Evolução
                                  </h3>
                                  <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl">
                                      Com o Kit Moldes Mágicos, você pula a fase de "tentativa e erro" e vai direto para a confecção profissional.
                                  </p>
                              </div>

                              <div className="h-64 md:h-96 w-full bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-100 p-2 md:p-6 shadow-inner relative overflow-hidden">
                                  <ResponsiveContainer width="100%" height="100%">
                                      <AreaChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                                          <defs>
                                              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                                                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                              </linearGradient>
                                          </defs>
                                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} dy={15} />
                                          <YAxis hide domain={[0, 110]} />
                                          <Tooltip 
                                              cursor={{ stroke: '#f43f5e', strokeWidth: 1, strokeDasharray: '4 4' }}
                                              contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', padding: '16px'}}
                                              itemStyle={{color: '#1e293b', fontWeight: 'bold', fontSize: '14px'}}
                                              formatter={(value) => [`${value}% Dominado`, 'Nível']}
                                          />
                                          <Area 
                                              type="monotone" 
                                              dataKey="value" 
                                              stroke="#f43f5e" 
                                              strokeWidth={4}
                                              fillOpacity={1} 
                                              fill="url(#colorValue)" 
                                              animationDuration={1500}
                                              activeDot={{ r: 8, strokeWidth: 0, fill: '#f43f5e' }}
                                          />
                                      </AreaChart>
                                  </ResponsiveContainer>
                              </div>
                          </div>

                          {/* Right: Benefits Cards */}
                          <div className="w-full lg:w-2/5 space-y-5 md:space-y-8">
                              <div className="group flex items-start gap-5 md:gap-8 p-5 md:p-8 rounded-2xl bg-stone-50 md:bg-slate-50 border border-stone-100 hover:bg-white hover:shadow-xl hover:border-rose-100 transition-all duration-300">
                                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-rose-100 border border-rose-200 shadow-sm flex items-center justify-center flex-shrink-0 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                                      <Scissors size={28} strokeWidth={1.5} className="md:w-8 md:h-8" />
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-slate-800 text-xl md:text-2xl mb-2 md:mb-3 group-hover:text-rose-600 transition-colors">Moldes Prontos</h4>
                                      <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                                          Pule a modelagem. Moldes testados para caimento perfeito.
                                      </p>
                                  </div>
                              </div>

                              <div className="group flex items-start gap-5 md:gap-8 p-5 md:p-8 rounded-2xl bg-stone-50 md:bg-slate-50 border border-stone-100 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300">
                                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-100 border border-blue-200 shadow-sm flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                      <Clock size={28} strokeWidth={1.5} className="md:w-8 md:h-8" />
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-slate-800 text-xl md:text-2xl mb-2 md:mb-3 group-hover:text-blue-600 transition-colors">Economia de Tempo</h4>
                                      <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                                          O que levaria horas, você faz em minutos. Mais costura, menos risco.
                                      </p>
                                  </div>
                              </div>

                              <div className="group flex items-start gap-5 md:gap-8 p-5 md:p-8 rounded-2xl bg-stone-50 md:bg-slate-50 border border-stone-100 hover:bg-white hover:shadow-xl hover:border-amber-100 transition-all duration-300">
                                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-amber-100 border border-amber-200 shadow-sm flex items-center justify-center flex-shrink-0 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                                      <Trophy size={28} strokeWidth={1.5} className="md:w-8 md:h-8" />
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-slate-800 text-xl md:text-2xl mb-2 md:mb-3 group-hover:text-amber-600 transition-colors">Acabamento de Loja</h4>
                                      <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                                          Surpreenda com peças que parecem ter saído de uma boutique.
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Offer Box */}
                  <div className="mx-4 md:mx-0 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-1 text-center shadow-2xl relative overflow-hidden group mb-16">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                      
                      {/* Floating Elements */}
                      <div className="absolute top-10 left-10 w-32 h-32 bg-rose-500/20 blur-3xl rounded-full animate-pulse"></div>
                      <div className="absolute bottom-10 right-10 w-52 h-52 bg-blue-500/20 blur-3xl rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>

                      <div className="bg-white/5 backdrop-blur-sm rounded-[2.4rem] px-6 py-14 md:py-24 md:px-24 relative z-10 flex flex-col items-center">
                          <div className="bg-rose-600 text-white text-xs md:text-base font-bold px-6 md:px-8 py-3 rounded-full uppercase tracking-widest mb-10 md:mb-14 inline-flex items-center gap-3 shadow-lg shadow-rose-900/50">
                              <Star size={16} fill="currentColor" /> Plano Personalizado para {firstName}
                          </div>
                          
                          <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-10 md:mb-16 tracking-tight leading-none">
                              Kit Moldes Mágicos <span className="block text-rose-400 mt-2 md:mt-4">Premium</span>
                          </h2>

                          <a 
                              href="https://moldescriativos.netlify.app/"
                              className="w-full max-w-3xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-2xl md:text-4xl font-bold py-8 md:py-10 px-10 md:px-16 rounded-3xl animate-subtle-pulse hover:animate-none hover:scale-[1.02] hover:-translate-y-2 transition-all duration-300 flex items-center justify-center gap-4 md:gap-8 group border border-white/10"
                          >
                              <div className="flex flex-col items-center leading-none gap-1">
                                <span className="tracking-wide text-shadow text-xl md:text-3xl font-medium">QUERO COMEÇAR</span>
                                <span className="tracking-wide text-shadow text-3xl md:text-5xl font-black border-b-4 border-white/40 pb-1">AGORA</span>
                              </div>
                              <ArrowRight className="group-hover:translate-x-3 transition-transform w-10 h-10 md:w-14 md:h-14" />
                          </a>
                          
                      </div>
                  </div>
                  
                  <p className="text-center text-slate-400 text-base md:text-lg opacity-75 pb-16 font-medium">
                      Esta oferta especial expira em breve. Não perca a chance de transformar sua paixão em realidade.
                  </p>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesPage;