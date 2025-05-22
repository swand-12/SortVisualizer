import { useEffect } from "react";


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function bubbleSort(array, setArr) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        setArr([...array]); // Trigger UI update
        await sleep(50);    // Delay for animation
      }
    }
  }
}

export async function selectionSort(array, setArr) {
  const n = array.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIdx]) minIdx = j;
    }
    [array[i], array[minIdx]] = [array[minIdx], array[i]];
    setArr([...array]);
    await sleep(50);
  }
}

// Merge Sort
export async function mergeSort(array, setArr) {
  async function mergeSortHelper(arr, l, r) {
    if (l >= r) return;
    const mid = Math.floor((l + r) / 2);
    await mergeSortHelper(arr, l, mid);
    await mergeSortHelper(arr, mid + 1, r);
    await merge(arr, l, mid, r);
    setArr([...arr]);
    await sleep(50);
  }

  async function merge(arr, l, m, r) {
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      arr[k++] = left[i] < right[j] ? left[i++] : right[j++];
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
  }

  await mergeSortHelper(array, 0, array.length - 1);
}

// Quick Sort
export async function quickSort(array, setArr) {
  async function quickSortHelper(arr, low, high) {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  }

  async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArr([...arr]);
        await sleep(50);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArr([...arr]);
    await sleep(50);
    return i + 1;
  }

  await quickSortHelper(array, 0, array.length - 1);
}

// Insertion Sort
export async function insertionSort(array, setArr) {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      setArr([...array]);
      await sleep(50);
    }
    array[j + 1] = key;
    setArr([...array]);
    await sleep(50);
  }
}

// Heap Sort
export async function heapSort(array, setArr) {
  let n = array.length;

  async function heapify(arr, n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArr([...arr]);
      await sleep(50);
      await heapify(arr, n, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(array, n, i);
  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    setArr([...array]);
    await sleep(50);
    await heapify(array, i, 0);
  }
}

// Radix Sort
export async function radixSort(array, setArr) {
  const getMax = (arr) => Math.max(...arr);

  const countingSort = async (arr, exp) => {
    const output = Array(arr.length).fill(0);
    const count = Array(10).fill(0);

    for (let i = 0; i < arr.length; i++) count[Math.floor(arr[i] / exp) % 10]++;
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];

    for (let i = arr.length - 1; i >= 0; i--) {
      const index = Math.floor(arr[i] / exp) % 10;
      output[--count[index]] = arr[i];
    }

    for (let i = 0; i < arr.length; i++) arr[i] = output[i];
    setArr([...arr]);
    await sleep(100);
  };

  const max = getMax(array);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    await countingSort(array, exp);
  }
}

// Counting Sort
export async function countingSort(array, setArr) {
  const max = Math.max(...array);
  const count = Array(max + 1).fill(0);
  const output = Array(array.length);

  for (let i = 0; i < array.length; i++) count[array[i]]++;
  for (let i = 1; i <= max; i++) count[i] += count[i - 1];

  for (let i = array.length - 1; i >= 0; i--) {
    output[--count[array[i]]] = array[i];
  }

  for (let i = 0; i < array.length; i++) array[i] = output[i];
  setArr([...array]);
  await sleep(100);
}

// Bucket Sort
export async function bucketSort(array, setArr) {
  const n = array.length;
  if (n <= 0) return;

  const buckets = Array.from({ length: 10 }, () => []);
  const max = Math.max(...array);

  for (let i = 0; i < n; i++) {
    const idx = Math.floor((array[i] / (max + 1)) * 10);
    buckets[idx].push(array[i]);
  }

  for (let bucket of buckets) bucket.sort((a, b) => a - b);

  let index = 0;
  for (let bucket of buckets) {
    for (let value of bucket) {
      array[index++] = value;
      setArr([...array]);
      await sleep(50);
    }
  }
}

// Shell Sort
export async function shellSort(array, setArr) {
  let n = array.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = array[i];
      let j;
      for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
        array[j] = array[j - gap];
        setArr([...array]);
        await sleep(50);
      }
      array[j] = temp;
      setArr([...array]);
      await sleep(50);
    }
  }
}

function StartButton({ selectedAlgorithm = "bubbleSort", arr, setArr }) {
  const handleClick = async () => {
    if (!selectedAlgorithm) {
      alert("Please select a sorting algorithm!");
      return;
    }

    switch (selectedAlgorithm) {
  case "bubbleSort":
    await bubbleSort([...arr], setArr);
    break;
  case "selectionSort":
    await selectionSort([...arr], setArr);
    break;
  case "mergeSort":
    await mergeSort([...arr], setArr);
    break;
  case "quickSort":
    await quickSort([...arr], setArr);
    break;
  case "insertionSort":
    await insertionSort([...arr], setArr);
    break;
  case "heapSort":
    await heapSort([...arr], setArr);
    break;
  case "radixSort":
    await radixSort([...arr], setArr);
    break;
  case "countingSort":
    await countingSort([...arr], setArr);
    break;
  case "bucketSort":
    await bucketSort([...arr], setArr);
    break;
  case "shellSort":
    await shellSort([...arr], setArr);
    break;
  default:
    alert("Algorithm not implemented yet.");
}
  };

  return (
    <button className="start-button" onClick={handleClick}>
      Start
    </button>
  );
}


export default StartButton;