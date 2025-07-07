import React from 'react';
import { useSortStore } from '../store/useSortStore';
import { ALGORITHM_INFO } from '../constants';

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-gray-800/50 p-3">
    <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
    <div className="font-mono text-teal-400 text-base mt-1">{value}</div>
  </div>
);

const AlgorithmInfo: React.FC = () => {
  const { algorithm } = useSortStore();
  const info = ALGORITHM_INFO[algorithm];

  return (
    <div className="bg-[#161B22] p-6 border-t border-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-x-8 gap-y-6">
        
        {/* Left: Description */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-medium text-white">{info.title}</h3>
          <p className="text-sm text-gray-400 mt-2">{info.description}</p>
        </div>
        
        {/* Right: Technical Specs */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Stat label="Worst Case" value={info.time.worst} />
          <Stat label="Average Case" value={info.time.average} />
          <Stat label="Best Case" value={info.time.best} />
          <Stat label="Space Complexity" value={info.space} />
          <Stat label="Stable" value={info.stable} />
          <Stat label="Method" value={info.method} />
        </div>

      </div>
    </div>
  );
};

export default AlgorithmInfo;
