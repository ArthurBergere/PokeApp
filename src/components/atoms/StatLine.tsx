import React from 'react';

interface StatLineProps {
  label: string;
  value: number;
  maxValue?: number;
  className?: string;
}

const StatLine: React.FC<StatLineProps> = ({
  label,
  value,
  maxValue = 255, // Valeur maximale standard pour les stats Pokémon
  className = '',
}) => {
  // Calcul du pourcentage pour la barre de progression
  const percentage = Math.min(Math.max((value / maxValue) * 100, 0), 100);
  
  // Couleur basée sur la valeur de la statistique
  let colorClass = 'bg-red-500';
  if (percentage > 75) {
    colorClass = 'bg-green-500';
  } else if (percentage > 50) {
    colorClass = 'bg-blue-500';
  } else if (percentage > 25) {
    colorClass = 'bg-yellow-500';
  }

  return (
    <div className={`${className}`}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm font-medium text-white">{value}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div 
          className={`h-2.5 rounded-full ${colorClass} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
          role="progressbar" 
          aria-valuenow={value} 
          aria-valuemin={0} 
          aria-valuemax={maxValue}
        ></div>
      </div>
    </div>
  );
};

export default StatLine;