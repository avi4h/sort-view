import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { solve } from '../utils/algorithms'

function VisualizerContainer({ currentSet, isRunning, speed, selectedAlgo, order, animationRef }) {
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
      }
    }
  }, [isRunning, selectedAlgo, order, currentSet, speed])

  const animateSolution = (solution) => {
    const frames = solution.getFrames()
    let frameIndex = 0

    const animate = () => {
      if (frameIndex >= frames.length || !isRunning) {
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
      className="bg-gray-100 p-8 flex items-end justify-center h-[calc(100vh-2rem)]"
      role="region"
      aria-label="Sorting algorithm visualization"
    >
      <AnimatePresence>
        {bars.map((height, index) => (
          <motion.div
            key={index}
            className={`w-4 mx-1 rounded-t-md ${
              comparedBars.includes(index) ? 'bg-blue-500' : 'bg-green-500'
            } flex flex-col justify-end items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500`}
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