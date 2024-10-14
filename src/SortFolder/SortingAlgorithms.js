export function mergeSort(array) {
    if (array.length <= 1) return []; // Return an empty animations array for trivial cases
    const animations = [];
    const auxiliaryArray = array.slice(); // Create a copy of the array to avoid modifying the original
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations; // Return the animations array
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return; // Base case: single element array is already sorted

    // Recursively split the array in two
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx; // Pointer for the main array
    let i = startIdx; // Pointer for the left half of auxiliaryArray
    let j = middleIdx + 1; // Pointer for the right half of auxiliaryArray

    // Merge the two halves together, recording animations
    while (i <= middleIdx && j <= endIdx) {
        // Push comparison for visualization (compare two elements)
        animations.push([i, j]); 
        animations.push([i, j]); // Push the same comparison again for resetting color

        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // Push the index and the new height for the bar to change
            animations.push([k, auxiliaryArray[i]]); // Swap bar height for the sorted element
            mainArray[k++] = auxiliaryArray[i++]; // Write the smaller element from left half
        } else {
            animations.push([k, auxiliaryArray[j]]); // Swap bar height for the sorted element
            mainArray[k++] = auxiliaryArray[j++]; // Write the smaller element from right half
        }
    }

    // Handle remaining elements in the left half, if any
    while (i <= middleIdx) {
        // Compare and swap the remaining elements
        animations.push([i, i]); // Comparison with itself
        animations.push([i, i]); // Reset the color
        animations.push([k, auxiliaryArray[i]]); // Update the height of the bar
        mainArray[k++] = auxiliaryArray[i++]; // Copy over the remaining elements
    }

    // Handle remaining elements in the right half, if any
    while (j <= endIdx) {
        // Compare and swap the remaining elements
        animations.push([j, j]); // Comparison with itself
        animations.push([j, j]); // Reset the color
        animations.push([k, auxiliaryArray[j]]); // Update the height of the bar
        mainArray[k++] = auxiliaryArray[j++]; // Copy over the remaining elements
    }
}
