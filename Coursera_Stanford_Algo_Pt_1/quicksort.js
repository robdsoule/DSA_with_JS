(function () {
  "use strict";

  var quickSort, quickSortNotInPlace, partition, swap, array1,
    comparisonCount;

  comparisonCount = 0;

  //quickSortNotInPlace = function (arr) {
  //  var left, right, pivot, i;
  //
  //  if (arr.length === 0) {
  //    return arr;
  //  }
  //  left = [];
  //  right = [];
  //  pivot = arr[0];
  //
  //  for (i = 1; i < arr.length; i += 1) {
  //    if (arr[i] < pivot) {
  //      left.push(arr[i]);
  //    } else {
  //      right.push(arr[i]);
  //    }
  //  }
  //
  //  return quickSort(left).concat(pivot, quickSort(right));
  //
  //};

  swap = function (arr, a, b) {
    var temp;

    if (a === b) {
      return;
    }

    temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  };

  partition = function (arr, left, right) {
    var pivot, i, j;
    pivot = arr[left];
    i = left + 1;
    j = right;

    if (i > j) {
      return;
    }
    while (i <= j) {
      while (arr[i] < pivot) {
        i += 1;
      }
      while (arr[j] > pivot) {
        j -= 1;
      }

      if (i <= j) {
        swap(arr, i, j);
        i += 1;
        j -= 1;
      }
    }

    return i;
  };

  quickSort = function (arr, left, right) {
    var index;

    index = partition(arr, left, right);
    if (left < index - 1) {
      quickSort(arr, left, index - 1);
    }
    if (index < right) {
      quickSort(arr, index, right);
    }
    return arr;
  };





  array1 = [7, 5, 1, 4, 8, 3, 10, 2, 6, 9];
  //console.log(quickSortNotInPlace(array1));
  console.log(quickSort(array1, 0, array1.length-1));
  console.log(comparisonCount);
}());