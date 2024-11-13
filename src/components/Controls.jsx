import React from 'react'
import { motion } from 'framer-motion'
import Select from 'react-select'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const algorithms = [
  { value: 'bubble', label: 'Bubble Sort' },
  { value: 'comb', label: 'Comb Sort' },
  { value: 'heap', label: 'Heap Sort' },
  { value: 'insertion', label: 'Insertion Sort' },
  { value: 'selection', label: 'Selection Sort' },
  { value: 'shell', label: 'Shell Sort' },
]

const orderOptions = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
]

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
  reset,
  restart
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div className="space-y-2">
        <label htmlFor="speed" className="block text-sm font-medium text-gray-700">Speed</label>
        <Slider
          min={1}
          max={100}
          value={speed}
          onChange={updateSpeed}
          disabled={isRunning}
          railStyle={{ backgroundColor: '#E5E7EB' }}
          trackStyle={{ backgroundColor: '#3B82F6' }}
          handleStyle={{
            borderColor: '#3B82F6',
            backgroundColor: '#3B82F6',
          }}
        />
        <span className="text-sm text-gray-600">{101 - speed}</span>
      </div>
      <div className="space-y-2">
        <label htmlFor="elements" className="block text-sm font-medium text-gray-700">Elements</label>
        <Slider
          min={5}
          max={30}
          value={totalElements}
          onChange={setTotalElements}
          disabled={isRunning}
          railStyle={{ backgroundColor: '#E5E7EB' }}
          trackStyle={{ backgroundColor: '#3B82F6' }}
          handleStyle={{
            borderColor: '#3B82F6',
            backgroundColor: '#3B82F6',
          }}
        />
        <span className="text-sm text-gray-600">{totalElements}</span>
      </div>
      <div className="space-y-2">
        <label htmlFor="algorithms" className="block text-sm font-medium text-gray-700">Algorithm</label>
        <Select
          options={algorithms}
          value={algorithms.find(algo => algo.value === selectedAlgo)}
          onChange={(selected) => setSelectedAlgo(selected.value)}
          isDisabled={isRunning}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="order" className="block text-sm font-medium text-gray-700">Order</label>
        <Select
          options={orderOptions}
          value={orderOptions.find(o => o.value === order)}
          onChange={(selected) => setOrder(selected.value)}
          isDisabled={isRunning}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <motion.button
          onClick={runAlgo}
          disabled={isRunning}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          aria-label="Start sorting"
        >
          Sort
        </motion.button>
        <motion.button
          onClick={stopAnimation}
          disabled={!isRunning}
          className="px-4 py-2 bg-red-500 text-white rounded-md disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-300"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          aria-label="Stop sorting"
        >
          Stop
        </motion.button>
        <motion.button
          onClick={reset}
          className="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          aria-label="Reset visualization"
        >
          Reset
        </motion.button>
        <motion.button
          onClick={restart}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          aria-label="Restart with same elements"
        >
          Restart
        </motion.button>
      </div>
    </div>
  )
}

export default Controls