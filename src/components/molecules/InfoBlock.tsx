import React from 'react';

interface InfoBlockProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const InfoBlock: React.FC<InfoBlockProps> = ({
  title,
  children,
  className = '',
  icon,
}) => {
  return (
    <div className={`bg-gray-800 rounded-lg border border-gray-700 shadow-md overflow-hidden ${className}`}>
      <div className="px-4 py-3 bg-gray-750 border-b border-gray-700 flex items-center gap-2">
        {icon && <div className="text-blue-400">{icon}</div>}
        <h3 className="font-medium text-white">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default InfoBlock;