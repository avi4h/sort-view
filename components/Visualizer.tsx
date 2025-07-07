import React from 'react';
import { useSortStore } from '../store/useSortStore';
import { Bar } from '../types';
import { motion } from 'framer-motion';

const Visualizer: React.FC = () => {
  const { array } = useSortStore();
  const barWidth = 100 / array.length;
  const showValues = array.length <= 50;

  return (
    <div className="flex-grow flex justify-center items-end px-2 pt-8 pb-4 gap-px min-h-0">
      {array.map((bar: Bar) => (
        <motion.div
          key={bar.id}
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 50 }}
          className="flex flex-col items-center justify-end"
          style={{ width: `${barWidth}%`, height: '100%' }}
        >
          {showValues && (
            <span className="text-xs text-gray-500 mb-1 font-mono">{bar.value}</span>
          )}
          <div
            className="transition-[background-color] duration-200 ease-out"
            style={{
              height: `${bar.value * 0.9}%`,
              width: '90%',
              backgroundColor: bar.color,
            }}
          ></div>
        </motion.div>
      ))}
    </div>
  );
};

export default Visualizer;