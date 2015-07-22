(function () {
  "use strict";

  var fs = require('fs'),
    parseTXTnumList,
    firstElementPivot,
    lastElementPivot,
    medianOfThreePivot,
    swap,
    partition,
    quickSort,
    comparisonCount,
    array2;
    //array1

  parseTXTnumList = function (fileName, splitRegEx) {
    var outArray;

    splitRegEx = splitRegEx || /\n/;
    // takes the txt file of #'s converts it to a string, splits it on \r\n
    outArray = fs.readFileSync(fileName).toString().split(splitRegEx);
    // filters the array removing any blank spaces(when parsing was getting 2
    // ''entries
    outArray = outArray.filter(function (item) {
      return !!item;
    });
    // converts all items in the array to a number with the + unary operator
    outArray = outArray.map(function (curr) {
      return +curr;
    });

    return outArray;
  };

  comparisonCount = 0;

  swap = function (arr, a, b) {
    var temp;

    temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  };

  firstElementPivot = function (arr, start) {
    // although arr is unused here, left it for ease of swapping between pivot
    // methods
    return start;
  };

  lastElementPivot = function (arr, start, end) {
    // swaps pivot(end value) with first element then returns start index
    swap(arr, start, end);
    return start;
  };

  medianOfThreePivot = function (arr, start, end) {
    var pivotIndex, middle, arrayOfOptions;
    // to find middle element of array, takes end value subtracted by start
    // divides by 2 to find the middle then offsets it by start
    // rounded down to pick first element in an even length ie. [0, 1, 2, 3]
    // it would choose 1 as the middle
    middle = Math.floor(((end - start) / 2) + start);
    // assign start middle and end values into an array for easy sorting
    arrayOfOptions = [
      arr[start],
      arr[middle],
      arr[end]
    ];

    // sorts the values in ascending order
    arrayOfOptions = arrayOfOptions.sort(function (a, b) {
      return a - b;
    });

    // these comparisons are required to return our index position of the median
    // all comparisons are to [1] of the sortedArray since it is sorted we know
    // that is the value we want to be our pivot
    if (arrayOfOptions[1] === arr[start]) {
      pivotIndex = start;
    } else if (arrayOfOptions[1] === arr[middle]) {
      pivotIndex = middle;
    } else {
      pivotIndex = end;
    }

    // this swaps our selected pivot with the first element in the array
    swap(arr, start, pivotIndex);

    return start;
  };

  partition = function (arr, start, end, pivotIndex) {
    var i, pivot, j;

    // increments comparison counter by length of arr - 1 thanks to zero based
    // ie. 3 - 0 = 3 but actually is an array of length 4
    comparisonCount += end - start;

    // assigns pivot value
    pivot = arr[pivotIndex];
    i = start;

    // j starts at the same value of i(the start)
    // will loop through until j is equal to the end of the array
    for (j = start; j <= end; j += 1) {
      // if the value at [j] is less than the pivot it will swap with the current
      // i index value and increment i by one;
      if (arr[j] < pivot) {
        i += 1;
        swap(arr, i, j);
      }
    }

    // this swaps the pivot with the last value in the 'right' side of the
    // partition ( <pivot ), putting it in its place
    swap(arr, pivotIndex, i);

    // returns current i index for future recursive calls of quicksort
    return i;
  };

  quickSort = function (arr, start, end) {
    var pivotIndex, partitionIndex;

    // figures length of current partition being called in quicksort and if it's
    // === 1 that means there are 2 elements in the array at this call.
    // ie. [8, 5]  end = 1, start = 0,  end - start = 1  but length === 2
    if (end - start === 1) {
      // swaps the two values if the first value is greater than the second value
      if (arr[start] > arr[end]) {
        swap(arr, start, end);
      }
      // increment comparisonCount by one because there is one comparison
      // occurring
      comparisonCount += 1;

      // it will continue through the recursive calls as long as the end index
      // is not less than or equal to the start index
    } else if (!(end <= start)) {
      // can swap out firstElementPivot(), lastElementPivot() or
      // medianOfThreePivot() in this line, which does the swapping of the pivot
      // element and returns the pivotIndex
      pivotIndex = firstElementPivot(arr, start, end);

      // calls partition and returns the Index number to be used for the other
      // recursive calls, see partition(), this is what does the swapping place,
      // and comparisonCounting
      partitionIndex = partition(arr, start, end, pivotIndex);

      // calls quickSort on the left partition with start index, and
      // partitionIndex - 1 (partitionIndex value is in place from the swapping)
      // so this partitions not including that value
      quickSort(arr, start, partitionIndex - 1);

      // quickSort for the right partition, partitionIndex+1 is going one beyond
      // the last partitionedPivot which is now in place, to the end
      quickSort(arr, partitionIndex + 1, end);
    }

    // returns arr for ease of console.log
    return arr;
  };




  //array1 = [7, 5, 1, 4, 8, 3, 10, 2, 6, 9];
  // used for the course txt parsing
  array2 = parseTXTnumList('QuickSort.txt', /\r\n/);
  console.log(array2[0], array2[array2.length - 1], array2.length);
  console.log(quickSort(array2, 0, array2.length - 1));
  console.log(comparisonCount);
}());