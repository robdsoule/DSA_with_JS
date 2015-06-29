(function () {
  "use strict";

  function merge(arrL, arrR) {
    // for visualization arrL=[0, 2, 4] arrR=[1, 3, 5, 6]
    var holdArr;
    holdArr = [];

    // this while loop runs while both arrays still have items in them
    while (arrL.length && arrR.length) {
      if (arrL[0] < arrR[0]) {
        holdArr.push(arrL.shift());
      } else {
        holdArr.push(arrR.shift());
      }
    }

    // if left array had more items it will still have some left, this will push
    // into the holding arr until all items from the left array are shifted out
    while (arrL.length) {
      holdArr.push(arrL.shift());
    }
    //opposite of above
    while (arrR.length) {
      holdArr.push(arrR.shift());
    }

    return holdArr;

  }

  function mergeSort(inputArr) {
    var left, middle, right;

    //base case
    if (inputArr.length < 2) {
      return inputArr;
    }

    //ie 7 items in array middle = 3, left = 0, 1, 2 | right = 3, 4, 5, 6
    middle = Math.floor(inputArr.length / 2);
    left = inputArr.slice(0, middle);
    right = inputArr.slice(middle, inputArr.length);

    return merge(mergeSort(left), mergeSort(right));
  }



  var inputArray = [0, 2, 4, 1, 3, 5, 6],
    a = [13, 14, 0, 23, 123124, 32, 3214, 51];
  console.log(mergeSort(inputArray));
  console.log(mergeSort(a));
}());
