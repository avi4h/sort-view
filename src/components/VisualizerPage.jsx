import React, { useState, useEffect, useRef } from 'react';
import Controls from './Controls';
import Visualizer from './Visualizer';
import AlgorithmInfo from './AlgorithmInfo';
import { solve, generateRandomSet } from '../utils/algorithms';

function VisualizerPage() {
  const [speed, setSpeed] = useState(50);
  const [totalElements, setTotalElements] = useState(50);
  const [currentSet, setCurrentSet] = useState([]);
  const [selectedAlgo, setSelectedAlgo] = useState('bubble');
  const [order, setOrder] = useState('asc');
  const [isRunning, setIsRunning] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    updateElements();
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    updateElements();
  }, [totalElements]);

  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 1200);
  };

  const updateSpeed = (newSpeed) => setSpeed(newSpeed);
  const updateElements = () => setCurrentSet(generateRandomSet(totalElements));

  const runAlgo = () => {
    if (isRunning) return;
    setIsRunning(true);
    const solution = solve(selectedAlgo, order, [...currentSet]);
    animateSolution(solution);
  };

  const stopAnimation = () => {
    setIsRunning(false);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  const reset = () => {
    stopAnimation();
    updateElements();
  };

  const animateSolution = (solution) => {
    const frames = solution.getFrames();
    let frameIndex = 0;

    const animate = () => {
      if (frameIndex >= frames.length || !isRunning) {
        setIsRunning(false);
        return;
      }

      const frame = frames[frameIndex];
      setCurrentSet(frame.elements);

      frameIndex++;
      animationRef.current = setTimeout(animate, 101 - speed);
    };

    animate();
  };

  if (isSmallScreen) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 className="text-2xl font-bold mx-2 mb-4 text-wrap text-center text-gray-600">Currently works best on desktop</h1>
          <p className=" text-wrap text-center text-gray-500" >Mobile view is still under development</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[27%] flex flex-col overflow-y-auto bg-gray-100 scrollbar-hide">
        <div className="pt-5 px-5 pb-4">
          <Controls
            speed={speed}
            totalElements={totalElements}
            selectedAlgo={selectedAlgo}
            order={order}
            isRunning={isRunning}
            updateSpeed={updateSpeed}
            setTotalElements={setTotalElements}
            setSelectedAlgo={setSelectedAlgo}
            setOrder={setOrder}
            runAlgo={runAlgo}
            stopAnimation={stopAnimation}
            reset={reset}
          />
        </div>
        <div className="flex-grow pt-1 pb-3 px-5">
          <AlgorithmInfo algorithm={selectedAlgo} />
        </div>
      </div>
      <div className="flex-grow overflow-hidden">
        <Visualizer currentSet={currentSet} />
      </div>
    </div>
  );
}

export default VisualizerPage;