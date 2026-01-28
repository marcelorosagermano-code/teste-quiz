import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-stone-200/50 backdrop-blur-sm h-3 rounded-full overflow-hidden mb-6 border border-white/50 shadow-inner">
      <div 
        className="h-full bg-gradient-to-r from-rose-500 to-pink-600 transition-all duration-700 ease-out relative"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute top-0 right-0 bottom-0 w-full bg-gradient-to-b from-white/20 to-transparent"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full mr-1 opacity-50"></div>
      </div>
    </div>
  );
};

export default ProgressBar;