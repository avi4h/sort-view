import { SortAlgorithmImplementation } from '../../store/useSortStore';
import { BarColor, SortOrder } from '../../types';
import { sleep, calculateDelay } from '../utils';

export const insertionSort: SortAlgorithmImplementation = async ({ getState, setState }) => {
  const array = [...getState().array];
  const n = array.length;

  if (n > 0) {
    array[0].color = BarColor.Sorted;
    setState({ array: [...array] });
  }

  for (let i = 1; i < n; i++) {
    if (getState().stopSortingRef.current) return;

    let j = i;

    array[j].color = BarColor.Pivot;
    setState({ array: [...array] });
    await sleep(calculateDelay(getState().speed));

    const condition = () =>
      getState().order === SortOrder.Ascending
        ? j > 0 && array[j - 1].value > array[j].value
        : j > 0 && array[j - 1].value < array[j].value;

    while (condition()) {
      if (getState().stopSortingRef.current) return;
      
      array[j - 1].color = BarColor.Comparing;
      setState({ array: [...array] });
      await sleep(calculateDelay(getState().speed));

      array[j - 1].color = BarColor.Swapping;
      array[j].color = BarColor.Swapping;
      setState({ array: [...array] });
      await sleep(calculateDelay(getState().speed));

      [array[j], array[j - 1]] = [array[j - 1], array[j]];

      array[j].color = BarColor.Sorted;
      array[j - 1].color = BarColor.Pivot;

      setState({ array: [...array] });
      await sleep(calculateDelay(getState().speed));

      j = j - 1;
    }
    
    array[j].color = BarColor.Sorted;
    setState({ array: [...array] });
  }
};