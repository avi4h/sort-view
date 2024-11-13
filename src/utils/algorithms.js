class Frame {
  constructor(e = [], h = []) {
    this.elements = e
    this.highlights = h
  }
}

class Animation {
  constructor() {
    this.frames = []
  }

  addFrame(frame) {
    this.frames.push(JSON.parse(JSON.stringify(frame)))
  }

  getFrames() {
    return this.frames
  }
}

export function generateRandomSet(totalElements) {
  if (totalElements < 5 || totalElements > 100) {
    throw new Error('Total elements must be between 5 and 100')
  }
  const set = new Set()
  while (set.size < totalElements) {
    set.add(Math.round(Math.random() * 99) + 1)
  }
  return set
}

export function solve(algo, order, elements) {
  if (!Array.isArray(elements) || elements.length === 0) {
    throw new Error('Invalid input: elements must be a non-empty array')
  }

  const compare = (a, b) => order === 'asc' ? a > b : a < b

  switch (algo) {
    case 'bubble':
      return bubbleSort(elements, compare)
    case 'comb':
      return combSort(elements, compare)
    case 'heap':
      return heapSort(elements, compare)
    case 'insertion':
      return insertionSort(elements, compare)
    case 'selection':
      return selectionSort(elements, compare)
    case 'shell':
      return shellSort(elements, compare)
    default:
      throw new Error('Invalid algorithm selected')
  }
}

function bubbleSort(elements, compare) {
  const solution = new Animation()
  const n = elements.length

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      solution.addFrame(new Frame([], [j, j + 1]))

      if (compare(elements[j], elements[j + 1])) {
        [elements[j], elements[j + 1]] = [elements[j + 1], elements[j]]
        solution.addFrame(new Frame([j, j + 1], [j, j + 1]))
      }
    }
  }

  return solution
}

function combSort(elements, compare) {
  const solution = new Animation()
  const n = elements.length
  let gap = n
  let swapped = true

  while (gap !== 1 || swapped) {
    gap = Math.max(1, Math.floor(gap / 1.3))
    swapped = false

    for (let i = 0; i < n - gap; i++) {
      solution.addFrame(new Frame([], [i, i + gap]))

      if (compare(elements[i], elements[i + gap])) {
        [elements[i], elements[i + gap]] = [elements[i + gap], elements[i]]
        solution.addFrame(new Frame([i, i + gap], [i, i + gap]))
        swapped = true
      }
    }
  }

  return solution
}

function heapSort(elements, compare) {
  const solution = new Animation()
  const n = elements.length

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(elements, n, i, compare, solution)
  }

  for (let i = n - 1; i > 0; i--) {
    solution.addFrame(new Frame([0, i], [0, i]))
    ;[elements[0], elements[i]] = [elements[i], elements[0]]
    heapify(elements, i, 0, compare, solution)
  }

  return solution
}

function heapify(elements, n, i, compare, solution) {
  let largest = i
  const left = 2 * i + 1
  const right = 2 * i + 2

  if (left < n && compare(elements[largest], elements[left])) {
    largest = left
  }

  if (right < n && compare(elements[largest], elements[right])) {
    largest = right
  }

  if (largest !== i) {
    solution.addFrame(new Frame([i, largest], [i, largest]))
    ;[elements[i], elements[largest]] = [elements[largest], elements[i]]
    heapify(elements, n, largest, compare, solution)
  }
}

function insertionSort(elements, compare) {
  const solution = new Animation()
  const n = elements.length

  for (let i = 1; i < n; i++) {
    let key = elements[i]
    let j = i - 1

    while (j >= 0 && compare(elements[j], key)) {
      solution.addFrame(new Frame([j, j + 1], [j, j + 1]))
      elements[j + 1] = elements[j]
      j--
    }

    elements[j + 1] = key
    solution.addFrame(new Frame([j + 1, i], [j + 1, i]))
  }

  return solution
}

function selectionSort(elements, compare) {
  const solution = new Animation()
  const n = elements.length

  for (let i = 0; i < n - 1; i++) {
    let minMax = i
    for (let j = i + 1; j < n; j++) {
      solution.addFrame(new Frame([], [minMax, j]))
      if (compare(elements[minMax], elements[j])) {
        minMax = j
      }
    }

    if (minMax !== i) {
      solution.addFrame(new Frame([i, minMax], [i, minMax]))
      ;[elements[i], elements[minMax]] = [elements[minMax], elements[i]]
    }
  }

  return solution
}

function shellSort(elements, compare) {
  const solution = new Animation()
  const n = elements.length

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let temp = elements[i]
      let j

      for (j = i; j >= gap && compare(elements[j - gap], temp); j -= gap) {
        solution.addFrame(new Frame([j, j - gap], [j, j - gap]))
        elements[j] = elements[j - gap]
      }

      elements[j] = temp
      solution.addFrame(new Frame([j, i], [j, i]))
    }
  }

  return solution
}