class Frame {
  constructor(elements = [], highlights = []) {
    this.elements = elements;
    this.highlights = highlights;
  }
}

class Animation {
  constructor() {
    this.frames = [];
  }

  addFrame(frame) {
    this.frames.push(JSON.parse(JSON.stringify(frame)));
  }

  getFrames() {
    return this.frames;
  }
}

export function generateRandomSet(totalElements) {
  if (totalElements < 5 || totalElements > 100) {
    throw new Error('Total elements must be between 5 and 100');
  }
  const set = new Set();
  while (set.size < totalElements) {
    set.add(Math.round(Math.random() * 99) + 1);
  }
  return Array.from(set);
}

export function solve(algo, order, elements) {
  if (!Array.isArray(elements) || elements.length === 0) {
    throw new Error('Invalid input: elements must be a non-empty array');
  }

  const compare = (a, b) => order === 'asc' ? a > b : a < b;

  switch (algo) {
    case 'bubble':
      return bubbleSort(elements, compare);
    case 'insertion':
      return insertionSort(elements, compare);
    case 'selection':
      return selectionSort(elements, compare);
    case 'quick':
      return quickSort(elements, compare);
    case 'merge':
      return mergeSort(elements, compare);
    default:
      throw new Error('Invalid algorithm selected');
  }
}

function bubbleSort(elements, compare) {
  const solution = new Animation();
  const n = elements.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      solution.addFrame(new Frame([...elements], [j, j + 1]));

      if (compare(elements[j], elements[j + 1])) {
        [elements[j], elements[j + 1]] = [elements[j + 1], elements[j]];
        solution.addFrame(new Frame([...elements], [j, j + 1]));
      }
    }
  }

  return solution;
}

function insertionSort(elements, compare) {
  const solution = new Animation();
  const n = elements.length;

  for (let i = 1; i < n; i++) {
    let key = elements[i];
    let j = i - 1;

    solution.addFrame(new Frame([...elements], [i]));

    while (j >= 0 && compare(elements[j], key)) {
      elements[j + 1] = elements[j];
      j--;
      solution.addFrame(new Frame([...elements], [j + 1, i]));
    }

    elements[j + 1] = key;
    solution.addFrame(new Frame([...elements], [j + 1]));
  }

  return solution;
}

function selectionSort(elements, compare) {
  const solution = new Animation();
  const n = elements.length;

  for (let i = 0; i < n - 1; i++) {
    let minMax = i;
    for (let j = i + 1; j < n; j++) {
      solution.addFrame(new Frame([...elements], [minMax, j]));
      if (compare(elements[minMax], elements[j])) {
        minMax = j;
      }
    }

    if (minMax !== i) {
      solution.addFrame(new Frame([...elements], [i, minMax]));
      [elements[i], elements[minMax]] = [elements[minMax], elements[i]];
      solution.addFrame(new Frame([...elements], [i, minMax]));
    }
  }

  return solution;
}

function quickSort(elements, compare) {
  const solution = new Animation();

  function partition(low, high) {
    const pivot = elements[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      solution.addFrame(new Frame([...elements], [j, high]));
      if (!compare(elements[j], pivot)) {
        i++;
        [elements[i], elements[j]] = [elements[j], elements[i]];
        solution.addFrame(new Frame([...elements], [i, j]));
      }
    }

    [elements[i + 1], elements[high]] = [elements[high], elements[i + 1]];
    solution.addFrame(new Frame([...elements], [i + 1, high]));
    return i + 1;
  }

  function quickSortHelper(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }

  quickSortHelper(0, elements.length - 1);
  return solution;
}

function mergeSort(elements, compare) {
  const solution = new Animation();

  function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      solution.addFrame(new Frame([...elements], [leftIndex, rightIndex]));
      if (!compare(left[leftIndex], right[rightIndex])) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  function mergeSortHelper(arr, start) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(mergeSortHelper(left, start), mergeSortHelper(right, start + mid));
  }

  elements = mergeSortHelper(elements, 0);
  solution.addFrame(new Frame([...elements], []));
  return solution;
}

export { Animation, Frame };