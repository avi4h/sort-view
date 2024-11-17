import React from 'react';

const algorithmInfo = {
  bubble: {
    name: "Bubble Sort",
    description: "Repeatedly compares adjacent elements and swaps them if they are in the wrong order until the list is sorted.",
    complexity: {
      worst: "O(n^2)",
      average: "O(n^2)",
      best: "O(n)",
    },
    stable: "Yes",
  },
  insertion: {
    name: "Insertion Sort",
    description: "Builds the sorted array one item at a time by inserting each new element into its proper position.",
    complexity: {
      worst: "O(n^2)",
      average: "O(n^2)",
      best: "O(n)",
    },
    stable: "Yes",
  },
  selection: {
    name: "Selection Sort",
    description: "Finds the smallest element in the unsorted part, swaps it with the first unsorted element, and repeats.",
    complexity: {
      worst: "O(n^2)",
      average: "O(n^2)",
      best: "O(n^2)",
    },
    stable: "No",
  },
  quick: {
    name: "Quick Sort",
    description: "Divides the array into smaller sub-arrays around a pivot and sorts each part recursively.",
    complexity: {
      worst: "O(n^2)",
      average: "O(n log n)",
      best: "O(n log n)",
    },
    stable: "No",
  },
  merge: {
    name: "Merge Sort",
    description: "Divides the array into halves, sorts each half recursively, and merges the sorted halves.",
    complexity: {
      worst: "O(n log n)",
      average: "O(n log n)",
      best: "O(n log n)",
    },
    stable: "Yes",
  }
};

function formatComplexity(complexity) {
  return complexity.replace(/\^(\d+)/g, '<sup>$1</sup>');
}

function AlgorithmInfo({ algorithm }) {
  const info = algorithmInfo[algorithm];

  return (
    <>
      <h2 className="text-xl font-bold mb-2 pt-7 border-t-slate-200 border-t-2 text-gray-600">{info.name}</h2>
      <p className="mb-3 text-sm text-justify text-gray-500">{info.description}</p>
      <ul className="space-y-1 text-gray-700">
        <li className="text-sm" >
          <span className="font-semibold text-sm">Best TC : </span>
          <span dangerouslySetInnerHTML={{ __html: formatComplexity(info.complexity.best) }} />
        </li>
        <li className="text-sm" >
          <span className="font-semibold text-sm">Average TC : </span> 
          <span dangerouslySetInnerHTML={{ __html: formatComplexity(info.complexity.average) }} />
        </li>
        <li className="text-sm" >
          <span className="font-semibold text-sm">Worst TC : </span>
          <span dangerouslySetInnerHTML={{ __html: formatComplexity(info.complexity.worst) }} />
        </li>
        <li className="text-sm" >
          <span className="font-semibold text-sm">Stable : </span> 
          {info.stable}
        </li>
      </ul>
    </>
  );
}

export default AlgorithmInfo;