export enum SortAlgorithm {
  Bubble = 'Bubble Sort',
  Selection = 'Selection Sort',
  Insertion = 'Insertion Sort',
  Merge = 'Merge Sort',
  Quick = 'Quick Sort',
}

export enum SortOrder {
  Ascending = 'Ascending',
  Descending = 'Descending',
}

export enum BarColor {
  Default = '#4B5563',   // gray-600
  Comparing = '#FBBF24', // amber-400
  Swapping = '#F472B6',  // pink-400
  Pivot = '#A78BFA',     // violet-400
  Sorted = '#2DD4BF',    // teal-400
}

export interface Bar {
  id: number;
  value: number;
  color: BarColor;
}