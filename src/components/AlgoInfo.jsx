import React from 'react'

const algoInfo = {
  bubble: {
    name: "Bubble Sort",
    description: "Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
    complexity: {
      worst: "O(n^2)",
      average: "O(n^2)",
      best: "O(n)",
      space: "O(1)"
    },
    method: "Exchanging",
    stable: "Yes"
  },
  comb: {
    name: "Comb Sort",
    description: "Comb Sort is mainly an improvement over Bubble Sort. It eliminates small values near the end of the list which reduce the gap between comparisons. The gap starts with a large value and shrinks by a factor of 1.3 in every iteration until it reaches 1.",
    complexity: {
      worst: "O(n^2)",
      average: "Ω(n^2/2^p) where p is the number of increments",
      best: "O(n log n)",
      space: "O(1)"
    },
    method: "Exchanging",
    stable: "No"
  },
  heap: {
    name: "Heap Sort",
    description: "Heap sort is a comparison-based sorting technique based on Binary Heap data structure. It involves building a Heap data structure from the given array and then utilizing the Heap to sort the array.",
    complexity: {
      worst: "O(n log n)",
      average: "O(n log n)",
      best: "O(n log n)",
      space: "O(1)"
    },
    method: "Selection",
    stable: "No"
  },
  insertion: {
    name: "Insertion Sort",
    description: "Insertion sort iterates, consuming one input element each repetition, and growing a sorted output list. At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there.",
    complexity: {
      worst: "O(n^2)",
      average: "O(n^2)",
      best: "O(n)",
      space: "O(1)"
    },
    method: "Insertion",
    stable: "Yes"
  },
  selection: {
    name: "Selection Sort",
    description: "Selection sort divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. Initially, the sorted portion is empty and the unsorted portion is the entire list. The algorithm proceeds by finding the smallest element in the unsorted portion, swapping it with the leftmost unsorted element, and moving the boundary one element to the right.",
    complexity: {
      worst: "O(n^2)",
      average: "O(n^2)",
      best: "O(n^2)",
      space: "O(1)"
    },
    method: "Selection",
    stable: "No"
  },
  shell: {
    name: "Shell Sort",
    description: "Shell sort is mainly a variation of Insertion Sort. In Shell sort, we make the array h-sorted for a large value of h. We keep reducing the value of h until it becomes 1. An array is said to be h-sorted if all sublists of every h'th element are sorted.",
    complexity: {
      worst: "O(n^2)",
      average: "O(n log n)",
      best: "O(n log n)",
      space: "O(1)"
    },
    method: "Insertion",
    stable: "No"
  }
}

function AlgoInfo({ selectedAlgo }) {
  const info = algoInfo[selectedAlgo]

  return (
    <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{info.name}</h2>
      <p className="mb-4 text-justify text-gray-600">{info.description}</p>
      <ul className="space-y-2 text-gray-700">
        <li><span className="font-bold">Worst-case time complexity:</span> {info.complexity.worst}</li>
        <li><span className="font-bold">Average-case time complexity:</span> {info.complexity.average}</li>
        <li><span className="font-bold">Best-case time complexity:</span> {info.complexity.best}</li>
        <li><span className="font-bold">Space complexity:</span> {info.complexity.space}</li>
        <li><span className="font-bold">Method:</span> {info.method}</li>
        <li><span className="font-bold">Stable:</span> {info.stable}</li>
      </ul>
    </div>
  )
}

export default AlgoInfo