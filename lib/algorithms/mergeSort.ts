import { SortAlgorithmImplementation, SortState } from '../../store/useSortStore';
import { BarColor, SortOrder, Bar } from '../../types';
import { sleep, calculateDelay } from '../utils';

type StoreUpdater = {
  getState: () => SortState;
  setState: (partial: Partial<SortState>) => void;
};

export const mergeSort: SortAlgorithmImplementation = async (store) => {
  if (store.getState().stopSortingRef.current) return;
  
  await mergeSortRecursive(store, 0, store.getState().array.length - 1);

  if (!store.getState().stopSortingRef.current) {
    const finalArray = store.getState().array.map((bar: Bar) => ({ ...bar, color: BarColor.Sorted }));
    store.setState({ array: finalArray });
    await sleep(calculateDelay(store.getState().speed) > 100 ? 100 : calculateDelay(store.getState().speed));
  }
};

const mergeSortRecursive = async (store: StoreUpdater, left: number, right: number) => {
  if (store.getState().stopSortingRef.current || left >= right) {
    return;
  }
  
  const middle = Math.floor(left + (right - left) / 2);
  await mergeSortRecursive(store, left, middle);
  await mergeSortRecursive(store, middle + 1, right);
  await merge(store, left, middle, right);
};

const merge = async (store: StoreUpdater, left: number, middle: number, right: number) => {
  const { getState, setState } = store;
  if (getState().stopSortingRef.current) return;

  const originalArray = getState().array;
  const leftHalf = originalArray.slice(left, middle + 1);
  const rightHalf = originalArray.slice(middle + 1, right + 1);

  let visArray = [...originalArray];
  for (let i = left; i <= right; i++) {
    if (visArray[i]) visArray[i].color = BarColor.Comparing;
  }
  setState({ array: visArray });
  await sleep(calculateDelay(getState().speed));

  let i = 0, j = 0;
  const mergedSlice: Bar[] = [];
  while (i < leftHalf.length && j < rightHalf.length) {
    const condition =
      getState().order === SortOrder.Ascending
        ? leftHalf[i].value <= rightHalf[j].value
        : leftHalf[i].value >= rightHalf[j].value;
    if (condition) mergedSlice.push(leftHalf[i++]);
    else mergedSlice.push(rightHalf[j++]);
  }
  while (i < leftHalf.length) mergedSlice.push(leftHalf[i++]);
  while (j < rightHalf.length) mergedSlice.push(rightHalf[j++]);

  for (let k = 0; k < mergedSlice.length; k++) {
    if (getState().stopSortingRef.current) return;
    let arrayToUpdate = [...getState().array];
    
    const barForPlacement = mergedSlice[k];
    const targetIndex = left + k;
    const fromIndex = arrayToUpdate.findIndex(b => b.id === barForPlacement.id);
    
    if (fromIndex === -1 || fromIndex === targetIndex) continue;

    arrayToUpdate[fromIndex].color = BarColor.Swapping;
    if (arrayToUpdate[targetIndex]) arrayToUpdate[targetIndex].color = BarColor.Swapping;
    setState({ array: [...arrayToUpdate] });
    await sleep(calculateDelay(getState().speed));

    const [barToMove] = arrayToUpdate.splice(fromIndex, 1);
    arrayToUpdate.splice(targetIndex, 0, barToMove);
    
    setState({ array: arrayToUpdate });
    await sleep(calculateDelay(getState().speed));

    const arrayAfterMove = [...getState().array];
    if (arrayAfterMove[targetIndex]) arrayAfterMove[targetIndex].color = BarColor.Comparing;
    setState({ array: arrayAfterMove });
  }

  const finalArray = [...getState().array];
  for(let m = left; m <= right; m++) {
      if(finalArray[m]) finalArray[m].color = BarColor.Default;
  }
  setState({ array: finalArray });
};