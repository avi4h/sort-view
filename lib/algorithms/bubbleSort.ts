import { SortAlgorithmImplementation } from '../../store/useSortStore';
import { BarColor, SortOrder } from '../../types';
import { sleep, calculateDelay } from '../utils';

export const bubbleSort: SortAlgorithmImplementation = async ({ getState, setState }) => {
  let array = [...getState().array];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (getState().stopSortingRef.current) return;

      array[j].color = BarColor.Comparing;
      array[j + 1].color = BarColor.Comparing;
      setState({ array: [...array] });
      await sleep(calculateDelay(getState().speed));

      const condition =
        getState().order === SortOrder.Ascending
          ? array[j].value > array[j + 1].value
          : array[j].value < array[j + 1].value;

      if (condition) {
        array[j].color = BarColor.Swapping;
        array[j + 1].color = BarColor.Swapping;
        setState({ array: [...array] });
        await sleep(calculateDelay(getState().speed) / 2);

        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        setState({ array: [...array] });
        await sleep(calculateDelay(getState().speed));
      }

      array[j].color = BarColor.Default;
      array[j + 1].color = BarColor.Default;
      setState({ array: [...array] });
    }
    array[n - 1 - i].color = BarColor.Sorted;
    setState({ array: [...array] });
  }
  
  if (array.length > 0) {
    array[0].color = BarColor.Sorted;
    setState({ array: [...array] });
  }
};