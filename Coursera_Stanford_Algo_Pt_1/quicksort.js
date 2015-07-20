(function () {
  "use strict";

  var quickSortNotInPlace, array1, comparisonCount;

  comparisonCount = 0;

  quickSortNotInPlace = function (arr) {
    var left, right, pivot, i;

    if (arr.length === 0) {
      return arr;
    }
    left = [];
    right = [];
    pivot = arr[0];

    for (i = 1; i < arr.length; i += 1) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return quickSort(left).concat(pivot, quickSort(right));

  };



  array1 = [7, 5, 1, 4, 8, 3, 10, 2, 6, 9];
  console.log(quickSortNotInPlace(array1));
}());