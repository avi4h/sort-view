import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import AlgoInfo from './components/AlgoInfo'
import Controls from './components/Controls'
import VisualizerContainer from './components/VisualizerContainer'
import { generateRandomSet } from './utils/algorithms'

function App() {
  const [speed, setSpeed] = useState(51)
  const [totalElements, setTotalElements] = useState(5)
  const [currentSet, setCurrentSet] = useState(new Set())
  const [selectedAlgo, setSelectedAlgo] = useState('bubble')
  const [order, setOrder] = useState('asc')
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState(null)
  const animationRef = useRef(null)

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
    if (animationRef.current) {
      clearTimeout(animationRef.current)
    }
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
    <div className="bg-white text-gray-900 min-h-screen flex">
      <aside className="w-1/3 bg-gray-100 p-6 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="space-y-6">
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
          <AlgoInfo selectedAlgo={selectedAlgo} />
        </div>
      </aside>
      <main className="flex-1 p-4 space-y-4 overflow-hidden">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <VisualizerContainer
          currentSet={currentSet}
          isRunning={isRunning}
          speed={speed}
          selectedAlgo={selectedAlgo}
          order={order}
          animationRef={animationRef}
        />
      </main>
      <motion.a
        href="https://github.com/avi4h/sorting-visualizer"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 bottom-4 bg-gray-200 p-2 rounded-full shadow-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Visit GitHub repository"
      >
        <img src="/public/github.png" alt="GitHub" className="w-8 h-8" />
      </motion.a>
    </div>
  )
}

export default App