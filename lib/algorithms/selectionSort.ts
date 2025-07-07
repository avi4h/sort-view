import { SortAlgorithmImplementation } from '../../store/useSortStore';
import { BarColor, SortOrder } from '../../types';
import { sleep, calculateDelay } from '../utils';

export const selectionSort: SortAlgorithmImplementation = async ({ getState, setState }) => {
  let array = [...getState().array];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minMaxIdx = i;
    array[i].color = BarColor.Pivot;

    for (let j = i + 1; j < n; j++) {
      if (getState().stopSortingRef.current) return;

      array[j].color = BarColor.Comparing;
      setState({ array: [...array] });
      await sleep(calculateDelay(getState().speed));

      const condition =
        getState().order === SortOrder.Ascending
          ? array[j].value < array[minMaxIdx].value
          : array[j].value > array[minMaxIdx].value;

      if (condition) {
        if (minMaxIdx !== i) array[minMaxIdx].color = BarColor.Default;
        minMaxIdx = j;
        array[j].color = BarColor.Pivot;
      } else {
        array[j].color = BarColor.Default;
      }
      setState({ array: [...array] });
    }

    if (minMaxIdx !== i) {
      array[i].color = BarColor.Swapping;
      array[minMaxIdx].color = BarColor.Swapping;
      setState({ array: [...array] });
      await sleep(calculateDelay(getState().speed));

      [array[i], array[minMaxIdx]] = [array[minMaxIdx], array[i]];
    }

    array[i].color = BarColor.Sorted;
    if (minMaxIdx !== i) array[minMaxIdx].color = BarColor.Default;
    setState({ array: [...array] });
  }

  if (n > 0) {
    array[n - 1].color = BarColor.Sorted;
    setState({ array: [...array] });
  }
};