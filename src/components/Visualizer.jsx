import React from 'react';

function Visualizer({ currentSet }) {
  const maxValue = Math.max(...currentSet);

  return (
    <div className="flex items-end justify-center h-full w-full p-4">
      {currentSet.map((height, index) => (
        <div
          key={index}
          className="w-2 mx-0.5 rounded-t-md transition-all duration-200"
          style={{
            height: `${(height / maxValue) * 100}%`,
            background: `linear-gradient(to top, #ecfdf5, #059669 ${(height / maxValue) * 100}%)`,
          }}
        />
      ))}
    </div>
  );
}

export default Visualizer;