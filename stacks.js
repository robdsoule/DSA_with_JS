(function () {
  'use strict';

  //create a Stack 'class' with methods, LIFO (Last in First Out)
  //using this for the methods
  function Stack() {
    var theStack = [];

    this.push = function () {
      var i;
      for (i = 0; i < arguments.length; i += 1) {
        theStack.push(arguments[i]);
        console.log('Pushed ' + arguments[i] + ' onto the stack.');
      }
    };

    this.pop = function () {
      var popparino = theStack.pop();
      console.log("Popped off " + popparino + ".");
      return popparino;
    };

    this.peek = function () {
      console.log("The top of the stack:", theStack[theStack.length - 1]);
      return theStack[theStack.length - 1];
    };

    this.isEmpty = function () {
      console.log("Is the stack empty?:", (theStack.length === 0));
      return theStack.length === 0;
    };

    this.clear = function () {
      console.log("The Stack has been cleared.");
      theStack = [];
    };

    this.size = function () {
      console.log("There are " + theStack.length + " items in the stack.");
      return theStack.length;
    };

  }

  //this takes a Decimal based number, and returns a string of the Binary
  //equivalent
  function decToBinary(num) {
    var binHoldArr = new Stack(),
      binString = "",
      startNum = num;
    while (num > 0) {
      binHoldArr.push(num % 2);
      num = Math.floor(num / 2);
    }

    while (!binHoldArr.isEmpty()) {
      binString += binHoldArr.pop();
    }

    return "decimal: " + startNum + " binary: " + binString.trim();
  }

  var aNewStack = new Stack();
  aNewStack.isEmpty();
  aNewStack.push('Nanner', 3, 12, 4);
  aNewStack.isEmpty();
  aNewStack.size();
  aNewStack.pop();
  aNewStack.peek();
  aNewStack.clear();
  aNewStack.isEmpty();
  console.log('----------------');
  console.log(decToBinary(10));
  console.log('----------------');
  console.log(decToBinary(2031));

}());
