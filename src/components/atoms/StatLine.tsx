import React from "react";

type StatLineProps = {
  label: string;
  value: number;
};

const StatLine: React.FC<StatLineProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between mb-1 text-white">
      <span>{label}</span>
      <span className="text-cyan-400 font-medium">{value}</span>
    </div>
  );
};

export default StatLine;