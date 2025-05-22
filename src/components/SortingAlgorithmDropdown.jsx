const SortingAlgorithmDropdown = ({ selectedAlgorithm, setSelectedAlgorithm }) => {
  const sortingAlgorithms = [
    { value: 'bubbleSort', label: 'Bubble Sort' },
    { value: 'selectionSort', label: 'Selection Sort' },
    { value: 'mergeSort', label: 'Merge Sort' },
    { value: 'quickSort', label: 'Quick Sort' },
    { value: 'insertionSort', label: 'Insertion Sort' },
    { value: 'heapSort', label: 'Heap Sort' },
    { value: 'radixSort', label: 'Radix Sort' },
    { value: 'countingSort', label: 'Counting Sort' },
    { value: 'bucketSort', label: 'Bucket Sort' },
    { value: 'shellSort', label: 'Shell Sort' },
  ];

  const handleChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <label htmlFor="sorting-algorithms" style={{ marginRight: '10px' }}>
        Choose a sorting algorithm:
      </label>
      <select
        id="sorting-algorithms"
        value={selectedAlgorithm}
        onChange={handleChange}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          minWidth: '200px',
        }}
      >
        <option value="">-- Select an algorithm --</option>
        {sortingAlgorithms.map((algorithm) => (
          <option key={algorithm.value} value={algorithm.value}>
            {algorithm.label}
          </option>
        ))}
      </select>

      {selectedAlgorithm && (
        <div style={{ marginTop: '20px' }}>
          Selected:{' '}
          <strong>
            {sortingAlgorithms.find((algo) => algo.value === selectedAlgorithm)?.label}
          </strong>
        </div>
      )}
    </div>
  );
};

export default SortingAlgorithmDropdown;
