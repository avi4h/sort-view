import React from 'react';
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const algorithms = [
  { value: 'bubble', label: 'Bubble Sort' },
  { value: 'insertion', label: 'Insertion Sort' },
  { value: 'selection', label: 'Selection Sort' },
  { value: 'quick', label: 'Quick Sort' },
  { value: 'merge', label: 'Merge Sort' }
];

const orderOptions = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
];

function Controls({
  speed,
  totalElements,
  selectedAlgo,
  order,
  isRunning,
  updateSpeed,
  setTotalElements,
  setSelectedAlgo,
  setOrder,
  runAlgo,
  stopAnimation,
  reset
}) {
  return (
    <div className="space-y-5">
      <div className="pt-3">
        <label className="block text-sm font-normal text-gray-700 mb-1">
          <span className="text-sm font-medium text-gray-700 mb-1">Speed : </span>
          {speed}
        </label>
        <Slider
          min={5}
          max={95}
          step={5}
          value={speed}
          onChange={updateSpeed}
          disabled={isRunning}
          styles={
            {
              track: {
                backgroundColor: '#34d399',
              },
              handle: {
                cursor: "pointer",
                backgroundColor: 'white',
                borderColor: '#34d399',

              }
            }
          }
        />
      </div>
      <div>
        <label className="block text-sm font-normal text-gray-700 mb-1">
          <span className="text-sm font-medium text-gray-700 mb-1">Elements : </span>
          {totalElements}
        </label>
        <Slider
          min={15}
          max={85}
          step={5}
          value={totalElements}
          onChange={setTotalElements}
          disabled={isRunning}
          styles={
            {
              track: {
                backgroundColor: '#34d399',
              },
              handle: {
                cursor: "pointer",
                backgroundColor: 'white',
                borderColor: '#34d399',
              },
            }
          }
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Algorithm</label>
        <Select
          className='text-sm'
          options={algorithms}
          value={algorithms.find(algo => algo.value === selectedAlgo)}
          onChange={(selected) => setSelectedAlgo(selected.value)}
          isDisabled={isRunning}
          theme={(theme) => ({
            ...theme,
            borderRadius: 3,
            colors: {
              ...theme.colors,
              primary50: '#d1fae5',
              primary25: '#d1fae5',
              primary: '#10b981',
            },
          })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
        <Select
          className='text-sm'
          options={orderOptions}
          value={orderOptions.find(o => o.value === order)}
          onChange={(selected) => setOrder(selected.value)}
          isDisabled={isRunning}
          theme={(theme) => ({
            ...theme,
            borderRadius: 3,
            colors: {
              ...theme.colors,
              primary50: '#d1fae5',
              primary25: '#d1fae5',
              primary: '#10b981',
            },
          })}
        />
      </div>
      <div className="flex space-x-3 pt-2">
        <button
          onClick={runAlgo}
          disabled={isRunning}
          className="px-6 py-2 text-sm text-gray-800 rounded-md border shadow-sm bg-emerald-50 border-emerald-500  hover:shadow-lg hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white   "
        >
          Start
        </button>
        <button
          onClick={stopAnimation}
          disabled={!isRunning}
          className="px-6 py-2 text-sm text-gray-800 rounded-md border shadow-sm bg-red-50 border-red-500 hover:shadow-lg hover:bg-red-200  disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-red-50 "
        >
          Stop
        </button>
        <button
          onClick={reset}
          className="px-6 py-2 text-sm text-gray-800 rounded-md border shadow-sm bg-slate-50 border-slate-500 hover:shadow-lg hover:bg-slate-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Controls;