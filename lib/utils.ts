import { Bar, BarColor } from '../types';

let nextId = 0;

export const generateRandomArray = (size: number): Bar[] => {
  const array: Bar[] = [];
  const min = 5;
  const max = 100;
  for (let i = 0; i < size; i++) {
    array.push({
      id: nextId++,
      value: Math.floor(Math.random() * (max - min + 1)) + min,
      color: BarColor.Default,
    });
  }
  return array;
};

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const calculateDelay = (speed: number): number => {
  const minDelay = 1; // ms for speed 100
  const maxDelay = 750; // ms for speed 1
  // We use inverted exponential scale (cubic) for granular control at lower speeds.
  // normalizedSpeed is 0 for speed=1, and 1 for speed=100.
  const normalizedSpeed = (speed - 1) / 99;
  const delay = minDelay + (maxDelay - minDelay) * Math.pow(1 - normalizedSpeed, 3);
  return delay;
};