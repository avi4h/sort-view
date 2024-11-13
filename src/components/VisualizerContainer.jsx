import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { solve } from '../utils/algorithms'

function VisualizerContainer({ currentSet, isRunning, speed, selectedAlgo, order, animationRef, setIsRunning }) {
  const [bars, setBars] = useState([])
  const [comparedBars, setComparedBars] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    setBars(Array.from(currentSet))
  }, [currentSet])

  useEffect(() => {
    if (isRunning) {
      try {
        const solution = solve(selectedAlgo, order, Array.from(currentSet))
        animateSolution(solution)
      } catch (error) {
        console.error('Error in solving algorithm:', error)
        setIsRunning(false)
      }
    }
  }, [isRunning, selectedAlgo, order, currentSet, speed, setIsRunning])

  const animateSolution = (solution) => {
    const frames = solution.getFrames()
    let frameIndex = 0

    const animate = () => {
      if (frameIndex >= frames.length) {
        setComparedBars([])
        setIsRunning(false)
        return
      }

      if (!isRunning) {
        setComparedBars([])
        return
      }

      const frame = frames[frameIndex]
      setComparedBars(frame.highlights)

      if (frame.elements.length) {
        setBars(prevBars => {
          const newBars = [...prevBars]
          const [i, j] = frame.elements
          ;[newBars[i], newBars[j]] = [newBars[j], newBars[i]]
          return newBars
        })
      }

      frameIndex++
      animationRef.current = setTimeout(animate, speed * 10)
    }

    animate()
  }

  const handleKeyDown = (event, index) => {
    if (event.key === 'ArrowLeft' && index > 0) {
      containerRef.current.children[index - 1].focus()
    } else if (event.key === 'ArrowRight' && index < bars.length - 1) {
      containerRef.current.children[index + 1].focus()
    }
  }

  return (
    <div 
      ref={containerRef}
      className="bg-white p-8 rounded-lg shadow-lg flex items-end justify-center h-[calc(100vh-2rem)] relative overflow-hidden"
      role="region"
      aria-label="Sorting algorithm visualization"
    >
      <AnimatePresence>
        {bars.map((height, index) => (
          <motion.div
            key={index}
            className={`relative w-8 mx-1 rounded-t-md ${
              comparedBars.includes(index) ? 'bg-yellow-400' : 'bg-blue-500'
            } flex flex-col justify-end items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300`}
            style={{ height: `${height}%` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            tabIndex={0}
            role="button"
            aria-label={`Bar ${index + 1} with height ${height}`}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            <span className="text-xs font-semibold text-white mb-1">{height}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default VisualizerContainer