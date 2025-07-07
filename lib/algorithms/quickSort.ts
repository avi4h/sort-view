import { BarColor, SortOrder } from '../../types';
import { sleep, calculateDelay } from '../utils';
import { SortAlgorithmImplementation, SortState } from '../../store/useSortStore';

type StoreUpdater = {
  getState: () => SortState;
  setState: (partial: Partial<SortState>) => void;
};

export const quickSort: SortAlgorithmImplementation = async (store) => {
  const initialArrayLength = store.getState().array.length;
  await sort(store, 0, initialArrayLength - 1);
};

const sort = async (store: StoreUpdater, low: number, high: number) => {
  const { getState, setState } = store;
  if (low > high) return;

  if (low === high) {
    if (!getState().stopSortingRef.current) {
        let array = [...getState().array];
        if(array[low]) array[low].color = BarColor.Sorted;
        setState({ array });
    }
    return;
  }

  if (low < high) {
    if (getState().stopSortingRef.current) return;
    
    const pi = await partition(store, low, high);
    
    let array = [...getState().array];
    array[pi].color = BarColor.Sorted;
    setState({ array });
    
    await sort(store, low, pi - 1);
    await sort(store, pi + 1, high);
  }
};

const partition = async (store: StoreUpdater, low: number, high: number) => {
  const { getState, setState } = store;
  let array = [...getState().array];
  const pivotValue = array[high].value;
  let i = low - 1;

  array[high].color = BarColor.Pivot;
  setState({ array: [...array] });
  await sleep(calculateDelay(getState().speed));

  for (let j = low; j < high; j++) {
    if (getState().stopSortingRef.current) return high;

    array[j].color = BarColor.Comparing;
    setState({ array: [...array] });
    await sleep(calculateDelay(getState().speed));

    const condition = getState().order === SortOrder.Ascending
        ? array[j].value < pivotValue
        : array[j].value > pivotValue;

    if (condition) {
      i++;
      array[i].color = BarColor.Swapping;
      array[j].color = BarColor.Swapping;
      setState({ array: [...array] });
      await sleep(calculateDelay(getState().speed));

      [array[i], array[j]] = [array[j], array[i]];
      setState({ array: [...array] });

      array[i].color = BarColor.Default;
    }

    array[j].color = BarColor.Default;
    setState({ array: [...array] });
  }

  const pivotFinalIndex = i + 1;
  array[high].color = BarColor.Swapping;
  if (array[pivotFinalIndex]) {
    array[pivotFinalIndex].color = BarColor.Swapping;
  }
  setState({ array: [...array] });
  await sleep(calculateDelay(getState().speed));

  [array[pivotFinalIndex], array[high]] = [array[high], array[pivotFinalIndex]];
  setState({ array: [...array] });
  
  array[high].color = BarColor.Default;
  if (array[pivotFinalIndex]) {
    array[pivotFinalIndex].color = BarColor.Default;
  }
  setState({ array: [...array] });
  
  return pivotFinalIndex;
};