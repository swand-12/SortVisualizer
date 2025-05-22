import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Block from './components/block.jsx'
import SortingAlgorithmDropdown from './components/sortingalgorithmDropDown.jsx'
import ArraySizeInput from './components/ArraySizeInput.jsx'
import StartButton from './components/StartButton.jsx'
function App() {
  const [arraySize, setArraySize] = useState(10);
  const [arr, setArr] = useState([]);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');

  // Function to generate a random array of given size
  const generateArray = (size) => {
    const newArr = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100) + 1
    );
    setArr(newArr);
  };

  // Regenerate array when arraySize changes
  useEffect(() => {
    generateArray(arraySize);
  }, [arraySize]);

  // Recalculate scaleFactor whenever array changes
  useEffect(() => {
    const maxValue = Math.max(...arr, 1); // Avoid division by zero
    const screenHeight = window.innerHeight;
    const computedScale = (0.5 * screenHeight) / maxValue;
    setScaleFactor(computedScale);
  }, [arr]);

  return (
    <>
      <h1>Sorting Algorithm Visualizer</h1>
      <SortingAlgorithmDropdown
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
     />
      <StartButton 
        selectedAlgorithm={selectedAlgorithm} 
        arr={arr} 
        setArr={setArr} 
      />
      <ArraySizeInput arrays={arraySize} setArrays={setArraySize} />
      <div style={{ display: 'flex', alignItems: 'flex-end', height: '80vh' }}>
        {arr.map((value, index) => (
          <Block key={index} value={value} scaleFactor={scaleFactor} width={600 / arraySize} />
        ))}
      </div>
    </>
  );
}

export default App;