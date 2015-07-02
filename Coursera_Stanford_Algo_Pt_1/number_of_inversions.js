(function () {
  "use strict";

  var fs = require('fs'), test1, bigList,
    numArr = fs.readFileSync('IntegerArray.txt').toString().split(/\r\n/);
  // takes the txt file of #'s converts it to a string, splits it on \r\n

  // filters the array removing any blank spaces(when parsing was getting 2
  // ''entries
  numArr = numArr.filter(function (item) {
    return !!item;
  });

  // converts all items in the array to a number with the + unary operator
  numArr = numArr.map(function (curr) {
    return +curr;
  });

  // takes the split arrays and merges them while keeping a counter of inversions
  function mergeAndCount(leftArr, rightArr) {
    var invCount, outputArray;
    // resets inversion counter and outputArray
    invCount = 0;
    outputArray = [];

    // while loop will run only while both arrays still have values in them
    while (leftArr.length > 0 && rightArr.length > 0) {
      // adds the lower of the current first elements of the left and right
      // array
      if (rightArr[0] < leftArr[0]) {
        // if the value in the right array is less than the left array, any
        // item in the left array counts as 1 inversion to the item in the right
        // array
        invCount += leftArr.length;
        // adds to output array while removing the first item from the right
        // array
        outputArray.push(rightArr.shift());
      } else {
        // otherwise adds the item from the left array, which is not an
        // inversion so the counter is not increased
        outputArray.push(leftArr.shift());
      }
    }

    // to avoid having to do an empty check on either array, use concat to add
    // the remaining of whichever array is empty after the above while loop &&
    // condition is no longer met
    outputArray = outputArray.concat(rightArr.concat(leftArr));

    // returns an object with the sorted merged array, as well as the accumulated
    // inversion number
    return {
      list: outputArray,
      inversion: invCount
    };
  }

  function divideAndConquer(inputArr) {
    var left, right, leftOut, rightOut, mergedOutput;

    // base case for recursion when one element in array returns an object with
    // the element and an inversion count of 0
    if (inputArr.length < 2) {
      return {
        list: inputArr,
        inversion: 0
      };
    }

    // otherwise assign the left array to the inputArr from index 0 to half the
    // length of the array (splice mutates the original array thus allowing
    // right array to be assigned with the elements remaining in inputArr)
    left = inputArr.splice(0, Math.floor(inputArr.length / 2));
    right = inputArr;

    // recursively calls the function to divide down to base case
    leftOut = divideAndConquer(left);
    rightOut = divideAndConquer(right);
    // theMerged array formed from calling mergeAndCount using the .list key on
    // the returned object from divideAndConquer
    mergedOutput = mergeAndCount(leftOut.list, rightOut.list);

    // returns the combined merged array and the sum of the inversion counts for
    // any left, right or 'split'(merged) inversions
    return {
      list: mergedOutput.list,
      inversion: leftOut.inversion + rightOut.inversion
                 + mergedOutput.inversion
    };
  }

  test1 = divideAndConquer([9, 12, 3, 1, 6, 8, 2, 5, 14,
                                13, 11, 7, 10, 4, 0]);
  bigList = divideAndConquer(numArr);
  console.log('Sorted Arr:', bigList.list,
              '# of Inversions:', bigList.inversion);
  console.log('Sorted Arr:', test1.list,
              '# of Inversions:', test1.inversion);
}());