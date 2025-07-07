import { create } from 'zustand';
import { SortAlgorithm, SortOrder, Bar, BarColor } from '../types';
import { generateRandomArray } from '../lib/utils';
import { bubbleSort } from '../lib/algorithms/bubbleSort';
import { selectionSort } from '../lib/algorithms/selectionSort';
import { insertionSort } from '../lib/algorithms/insertionSort';
import { mergeSort } from '../lib/algorithms/mergeSort';
import { quickSort } from '../lib/algorithms/quickSort';

export interface SortState {
  array: Bar[];
  arraySize: number;
  algorithm: SortAlgorithm;
  order: SortOrder;
  speed: number;
  isSorting: boolean;
  isSorted: boolean;
  stopSortingRef: React.MutableRefObject<boolean>;
  setArray: (array: Bar[]) => void;
  setArraySize: (size: number) => void;
  setAlgorithm: (algo: SortAlgorithm) => void;
  setOrder: (order: SortOrder) => void;
  setSpeed: (speed: number) => void;
  startSort: () => Promise<void>;
  stopSort: () => void;
  reset: () => void;
}

export type SortAlgorithmImplementation = (store: {
  getState: () => SortState;
  setState: (
    partial: Partial<SortState> | ((state: SortState) => Partial<SortState>),
    replace?: boolean | undefined
  ) => void;
}) => Promise<void>;

const ALGORITHMS: Record<SortAlgorithm, SortAlgorithmImplementation> = {
  [SortAlgorithm.Bubble]: bubbleSort,
  [SortAlgorithm.Selection]: selectionSort,
  [SortAlgorithm.Insertion]: insertionSort,
  [SortAlgorithm.Merge]: mergeSort,
  [SortAlgorithm.Quick]: quickSort,
};

const DEFAULT_ARRAY_SIZE = 50;
const DEFAULT_SPEED = 50;

export const useSortStore = create<SortState>((set, get) => ({
  array: generateRandomArray(DEFAULT_ARRAY_SIZE),
  arraySize: DEFAULT_ARRAY_SIZE,
  algorithm: SortAlgorithm.Bubble,
  order: SortOrder.Ascending,
  speed: DEFAULT_SPEED,
  isSorting: false,
  isSorted: false,
  stopSortingRef: { current: false },
  setArray: (array) => set({ array }),
  setArraySize: (size) => {
    set({ arraySize: size });
    get().reset();
  },
  setAlgorithm: (algo) => {
    const { array } = get();
    const resetColorArray = array.map(bar => ({ ...bar, color: BarColor.Default }));
    set({ algorithm: algo, isSorted: false, array: resetColorArray });
  },
  setOrder: (order) => {
    const { array } = get();
    const resetColorArray = array.map(bar => ({ ...bar, color: BarColor.Default }));
    set({ order: order, isSorted: false, array: resetColorArray });
  },
  setSpeed: (speed) => set({ speed }),
  startSort: async () => {
    const { isSorting, algorithm, stopSortingRef } = get();
    if (isSorting) return;

    stopSortingRef.current = false;
    set({ isSorting: true, isSorted: false });

    const sortFunction = ALGORITHMS[algorithm];
    await sortFunction({ getState: get, setState: set });

    if (!stopSortingRef.current) {
      set({ isSorted: true });
    }
    
    set({ isSorting: false });
  },
  stopSort: () => {
    const { stopSortingRef } = get();
    stopSortingRef.current = true;
    set({ isSorting: false });
  },
  reset: () => {
    const { isSorting, arraySize, stopSortingRef } = get();
    if (isSorting) {
      stopSortingRef.current = true;
    }
    set({
      array: generateRandomArray(arraySize),
      isSorting: false,
      isSorted: false,
    });
  },
}));