import React from 'react';

export type StepType = 'question' | 'social-proof' | 'intro' | 'input';

export interface Option {
  id: string;
  label: string;
  image?: string;
  score?: number;
  icon?: any;
  emoji?: string;
}

export interface Step {
  id: string;
  type: StepType;
  title?: string;
  subtitle?: string;
  content?: string;
  options?: Option[];
  image?: string;
  highlight?: string;
  inputType?: 'text' | 'email';
  placeholder?: string;
  buttonLabel?: string;
}

export interface QuizState {
  currentStepIndex: number;
  answers: Record<string, string>;
  userName?: string;
  isAnalyzing: boolean;
  isComplete: boolean;
  score: number;
}