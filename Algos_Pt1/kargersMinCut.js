(function () {
  "use strict";

  var fs,
    parseTXTnumList,
    adjList2;

  fs = require('fs');

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

  adjList2 = parseTXTnumList('QuickSort.txt', /\r\n/);
}());