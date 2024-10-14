import React from "react";
import './SortingVisualizer.css'; // Import your styles
import { mergeSort } from '../SortFolder/SortingAlgorithms'; // Import mergeSort from SortingAlgorithms

export class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [], // Initialize the array state
    };
  }

  // Lifecycle method to reset the array on component mount
  componentDidMount() {
    this.resetArray();
  }

  // Function to reset the array with random values
  resetArray() {
    const array = [];
    for (let i = 0; i < 230; i++) {
      array.push(randomIntFromInterval(5, 730)); // Generate random numbers
    }
    this.setState({ array }); // Update the state with the new array
  }

  // Merge sort logic and animations
  mergeSort() {
    const animations = mergeSort(this.state.array); // Get animations from mergeSort
    const arrayBars = document.getElementsByClassName('array-bar');
    const newAnimations = []; // To store animations for color and height changes
  
    // Ensure that there are array bars rendered before proceeding
    if (arrayBars.length === 0) {
      console.error("No array bars found");
      return;
    }
  
    // Process animations
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
  
        // Check if barOneIdx and barTwoIdx are valid
        if (!arrayBars[barOneIdx] || !arrayBars[barTwoIdx]) {
          console.error(`Invalid bar index: ${barOneIdx}, ${barTwoIdx}`);
          continue;
        }
  
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? '' : '';
        newAnimations.push(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        });
      } else {
        newAnimations.push(() => {
          const [barOneIdx, newHeight] = animations[i];
  
          // Check if barOneIdx is valid
          if (!arrayBars[barOneIdx]) {
            console.error(`Invalid bar index: ${barOneIdx}`);
            return;
          }
  
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        });
      }
    }

    // Execute animations with delays
    for (let i = 0; i < newAnimations.length; i++) {
      setTimeout(newAnimations[i], i * 10);
    }
  }

  // Add placeholder methods for other sorting algorithms
  quickSort() {
    // Placeholder for quick sort
  }

  heapSort() {
    // Placeholder for heap sort
  }

  bubbleSort() {
    // Placeholder for bubble sort
  }

  // Render method
  render() {
    const { array } = this.state; // Get the array from the state

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px` }} // Set height of each bar
          ></div>
        ))}
        <button onClick={() => this.resetArray()}>Reset Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>
    );
  }
}

// Utility function to generate a random integer between two values
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
