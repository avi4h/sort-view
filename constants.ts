import { SortAlgorithm } from './types';

export const ALGORITHM_INFO: Record<SortAlgorithm, {
  title: string;
  description: string;
  time: { best: string; average: string; worst: string };
  space: string;
  stable: 'Yes' | 'No';
  method: string;
}> = {
  [SortAlgorithm.Bubble]: {
    title: 'Bubble Sort',
    description: 'A simple comparison algorithm that repeatedly steps through the list, swapping adjacent elements if they are in the wrong order. Passes are repeated until no more swaps are needed.',
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
    stable: 'Yes',
    method: 'Exchanging',
  },
  [SortAlgorithm.Selection]: {
    title: 'Selection Sort',
    description: 'An in-place algorithm that divides the list into sorted and unsorted parts. It repeatedly selects the smallest element from the unsorted section and moves it to the sorted section.',
    time: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
    stable: 'No',
    method: 'Selection',
  },
  [SortAlgorithm.Insertion]: {
    title: 'Insertion Sort',
    description: 'Builds the final sorted array one item at a time. It takes each element from the input and inserts it into its correct position within the already sorted part of the array.',
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
    stable: 'Yes',
    method: 'Insertion',
  },
  [SortAlgorithm.Merge]: {
    title: 'Merge Sort',
    description: 'A "divide and conquer" algorithm that recursively splits the array in half until each sub-array has one element, then merges them back together in a sorted manner.',
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(n)',
    stable: 'Yes',
    method: 'Merging',
  },
  [SortAlgorithm.Quick]: {
    title: 'Quick Sort',
    description: 'A "divide and conquer" algorithm that selects a "pivot" and partitions other elements into two sub-arrays based on whether they are less than or greater than the pivot.',
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    space: 'O(log n)',
    stable: 'No',
    method: 'Partitioning',
  },
};