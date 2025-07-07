import React, { useState, useEffect, useCallback } from 'react';
import { useSortStore } from '../store/useSortStore';
import { SortAlgorithm, SortOrder } from '../types';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import ShuffleIcon from './icons/ShuffleIcon';
import CustomSelect from './CustomSelect';

const Controls: React.FC = () => {
  const {
    arraySize,
    setArraySize,
    algorithm,
    setAlgorithm,
    order,
    setOrder,
    speed,
    setSpeed,
    isSorting,
    startSort,
    stopSort,
    reset,
  } = useSortStore();

  const [localArraySize, setLocalArraySize] = useState(arraySize);

  const debounce = <F extends (...args: any[]) => any>(func: F, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<F>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };
  
  const debouncedSetArraySize = useCallback(debounce(setArraySize, 300), [setArraySize]);

  useEffect(() => {
    debouncedSetArraySize(localArraySize);
  }, [localArraySize, debouncedSetArraySize]);
  
  const algorithmOptions = Object.values(SortAlgorithm).map(alg => ({ value: alg, label: alg }));
  const orderOptions = Object.values(SortOrder).map(ord => ({ value: ord, label: ord }));


  return (
    <div className="bg-[#161B22] p-4 border-b border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-x-6 gap-y-4 items-end">
        
        <div className="flex flex-col space-y-2 lg:col-span-2">
          <label htmlFor="algorithm" className="text-xs font-medium text-gray-400 uppercase tracking-wider">Algorithm</label>
          <CustomSelect
            id="algorithm"
            options={algorithmOptions}
            value={algorithm}
            onChange={(val) => setAlgorithm(val as SortAlgorithm)}
            disabled={isSorting}
          />
        </div>
        
        <div className="flex flex-col space-y-2 lg:col-span-2">
          <label htmlFor="order" className="text-xs font-medium text-gray-400 uppercase tracking-wider">Order</label>
           <CustomSelect
            id="order"
            options={orderOptions}
            value={order}
            onChange={(val) => setOrder(val as SortOrder)}
            disabled={isSorting}
          />
        </div>

        <div className="flex flex-col space-y-2 lg:col-span-2">
            <label htmlFor="array-size" className="text-xs font-medium text-gray-400 uppercase tracking-wider">Size ({localArraySize})</label>
            <input
                id="array-size"
                type="range"
                min="10"
                max="150"
                step="1"
                value={localArraySize}
                onChange={(e) => setLocalArraySize(Number(e.target.value))}
                disabled={isSorting}
                className="w-full h-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />
        </div>

        <div className="flex flex-col space-y-2 lg:col-span-2">
            <label htmlFor="speed" className="text-xs font-medium text-gray-400 uppercase tracking-wider">Speed (Slow ↔ Fast)</label>
            <input
                id="speed"
                type="range"
                min="1"
                max="100"
                step="1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-4 cursor-pointer"
            />
        </div>

        <div className="flex items-center space-x-2 lg:col-span-2 justify-self-center lg:justify-self-end">
          <button 
            onClick={isSorting ? stopSort : startSort} 
            className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-black font-bold flex justify-center items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
            {isSorting ? <PauseIcon className="h-5 w-5"/> : <PlayIcon className="h-5 w-5"/>}
          </button>
          <button 
            onClick={reset}
            disabled={isSorting}
            title="Shuffle Array"
            className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-bold flex justify-center items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShuffleIcon className="h-5 w-5"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
