import { Step } from './types';
import {
  Calendar, Scissors, Award, Zap, Heart, DollarSign, Star,
  Frown, Clock, Compass, AlertCircle, HelpCircle, CreditCard,
  CalendarX, Sparkles, TrendingUp, GraduationCap, PartyPopper,
  Palette, Shirt, Gift, Battery, BatteryLow, BatteryMedium,
  CalendarDays, CalendarRange, Sun, Feather, Weight, Dumbbell,
  Smile, User, Baby, CheckCircle2, ArrowRight, Ruler, FileQuestion, 
  Ghost, Eye, BookOpen, Hammer, ThumbsUp
} from 'lucide-react';

export const STEPS: Step[] = [
  {
    id: 'intro',
    type: 'intro',
    title: 'Transforme Tecidos em Sonhos',
    subtitle: 'Descubra exatamente qual o kit de moldes ideal para você começar a criar roupas infantis maravilhosas, mesmo sem experiência.',
    image: 'https://i.postimg.cc/kgyTkxwS/Chat-GPT-Image-22-de-jan-de-2026-00-01-37.png'
  },
  {
    id: 'name',
    type: 'input',
    inputType: 'text',
    title: 'Vamos nos conhecer',
    subtitle: 'Antes de começarmos, como você gostaria de ser chamada?',
    placeholder: 'Digite seu primeiro nome...',
    buttonLabel: 'Começar Jornada Mágica',
    image: 'https://images.unsplash.com/photo-1512106263799-316279f6f695?q=80&w=1000&auto=format&fit=crop'
  },
  // Part 1: Motivation
  {
    id: 'objective',
    type: 'question',
    title: 'Seu Grande Motivo',
    subtitle: 'O que faz seu coração bater mais forte ao pensar em costura?',
    options: [
      { id: 'personal', label: 'Ver meus filhos/netos vestindo algo feito por mim com amor', score: 15, icon: Heart },
      { id: 'income', label: 'Conquistar minha independência financeira vendendo peças', score: 30, icon: DollarSign },
      { id: 'skill', label: 'Terapia pura: relaxar a mente e criar peças artísticas', score: 20, icon: Sparkles },
    ],
  },
  // Part 2: Situation
  {
    id: 'experience',
    type: 'question',
    title: 'Sua Experiência',
    subtitle: 'Qual sua relação atual com a máquina de costura?',
    options: [
      { id: 'beginner', label: 'Nunca peguei numa agulha (ou sou super iniciante)', emoji: '🐣', score: 10, icon: Zap },
      { id: 'intermediate', label: 'Já me arrisco em alguns consertos e peças simples', emoji: '✂️', score: 20, icon: Scissors },
      { id: 'advanced', label: 'Costuro bem, mas quero moldes profissionais e modelagem perfeita', emoji: '🚀', score: 30, icon: Award },
    ],
  },
  // Part 3: Objection Handling - Equipment
  {
    id: 'machine',
    type: 'question',
    title: 'Sua Ferramenta',
    subtitle: 'Qual sua parceira de costura atual? (Não se preocupe, todas servem!)',
    options: [
        { id: 'domestic', label: 'Máquina Doméstica Simples', icon: Scissors },
        { id: 'industrial', label: 'Máquina Industrial / Overlock', icon: Zap },
        { id: 'none', label: 'Ainda não tenho / Costuro à mão', icon: HelpCircle }
    ]
  },
  {
    id: 'social-proof-1',
    type: 'social-proof',
    // Clean step configuration for maximum image visibility
    image: 'https://i.postimg.cc/j5V0j60x/Digitalizado-20260122-0035.jpg',
    buttonLabel: 'Eu Quero Resultados Assim'
  },
  // Part 4: Objection Handling - Time
  {
      id: 'time',
      type: 'question',
      title: 'Seu Ritmo',
      subtitle: 'A vida é corrida, nós sabemos. Quanto tempo você pode dedicar?',
      options: [
          { id: 'little', label: 'Corrida: 30 min a 1h por dia (Vou no meu tempo)', icon: Clock },
          { id: 'weekend', label: 'Apenas nos finais de semana', icon: Calendar },
          { id: 'free', label: 'Tenho bastante tempo livre para me dedicar', icon: Sun }
      ]
  },
  // Part 5: Pains
  {
    id: 'feelings',
    type: 'question',
    title: 'A Verdade',
    subtitle: 'Qual o maior defeito dos moldes que você encontra por aí?',
    options: [
      { id: 'fit', label: 'Tamanhos errados que nunca servem na criança', score: 10, icon: Ruler },
      { id: 'instructions', label: 'Explicações confusas (parece grego)', score: 20, icon: FileQuestion },
      { id: 'ugly', label: 'Modelos ultrapassados e sem graça', score: 10, icon: Ghost },
    ],
  },
  // Part 6: Preferences
  {
    id: 'age_group',
    type: 'question',
    title: 'Foco Criativo',
    subtitle: 'Para quem você sonha em costurar primeiro?',
    options: [
      { id: 'baby', label: 'Bebês Fofinhos (0-2 anos)', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400', icon: Baby },
      { id: 'kid', label: 'Crianças Pequenas (3-5 anos)', image: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&q=80&w=400', icon: Smile },
      { id: 'teen', label: 'Crianças Maiores (6-12 anos)', image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=80&w=400', icon: User },
    ],
  }
];