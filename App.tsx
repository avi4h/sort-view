import React, { useState, useEffect } from 'react';
import Controls from './components/Controls';
import Visualizer from './components/Visualizer';
import AlgorithmInfo from './components/AlgorithmInfo';

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0D1117] text-center text-gray-300 p-4">
        <div>
          <h1 className="text-2xl font-light tracking-[0.2em] uppercase">Sort View</h1>
          <p className="mt-4 text-gray-400">This application is designed for a desktop experience. Please switch to a larger device.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#0D1117]">
      <Controls />
      <main className="flex-grow flex flex-col min-h-0">
        <Visualizer />
        <AlgorithmInfo />
      </main>
    </div>
  );
};

export default App;