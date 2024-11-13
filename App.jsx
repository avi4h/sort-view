'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AlgoInfo from './components/AlgoInfo'
import Controls from './components/Controls'
import VisualizerContainer from './components/VisualizerContainer'
import { generateRandomSet } from './utils/algorithms'

export default function App() {
  const [speed, setSpeed] = useState(51)
  const [totalElements, setTotalElements] = useState(5)
  const [currentSet, setCurrentSet] = useState(new Set())
  const [selectedAlgo, setSelectedAlgo] = useState('bubble')
  const [order, setOrder] = useState('asc')
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      updateElements()
    } catch (error) {
      setError(error.message)
    }
  }, [totalElements])

  const updateSpeed = (newSpeed) => {
    setSpeed(newSpeed)
  }

  const updateElements = () => {
    try {
      const newSet = generateRandomSet(totalElements)
      setCurrentSet(newSet)
      setError(null)
    } catch (error) {
      setError(error.message)
    }
  }

  const runAlgo = () => {
    if (speed <= 0) {
      setError("Speed must be greater than 0")
      return
    }
    setIsRunning(true)
    setError(null)
  }

  const stopAnimation = () => {
    setIsRunning(false)
  }

  const reset = () => {
    stopAnimation()
    updateElements()
  }

  const restart = () => {
    stopAnimation()
    setCurrentSet(new Set(currentSet))
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen grid grid-cols-1 lg:grid-cols-[25vw_1fr] grid-rows-[auto_1fr]">
      <header className="col-span-full bg-gray-800 p-4 text-center">
        <h1 className="text-2xl font-bold">Sorting Algorithm Visualizer</h1>
      </header>
      <AlgoInfo selectedAlgo={selectedAlgo} />
      <main className="p-4 space-y-4">
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
          restart={restart}
        />
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md" role="alert">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}
        <VisualizerContainer
          currentSet={currentSet}
          isRunning={isRunning}
          speed={speed}
          selectedAlgo={selectedAlgo}
          order={order}
        />
      </main>
      <motion.a
        href="https://github.com/yourusername/sorting-visualizer"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 bottom-4 bg-gray-800 p-2 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Visit GitHub repository"
      >
        <img src="/images/github.png" alt="GitHub" className="w-8 h-8" />
      </motion.a>
    </div>
  )
}