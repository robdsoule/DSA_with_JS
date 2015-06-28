(function () {
  'use strict';

  //Queue, FIFO(First in First Out)
  //return the methods in an object that access the line and number via closure
  function Queue() {
    var theLine = [],
      numberInQueue = 0;

    return {

      enqueue: function () {
        var i;
        for (i = 0; i < arguments.length; i += 1) {
          theLine.push(arguments[i]);
          numberInQueue += 1;
          console.log(arguments[i] + ' added to the Queue');
        }

        return theLine;
      },

      dequeue: function () {
        numberInQueue -= 1;
        console.log(theLine[0] + ' is up in the Queue!');
        return theLine.shift();
      },

      front: function () {
        console.log('the next up is ' + theLine[0]);
        return theLine[0];
      },

      isEmpty: function () {
        console.log('Is q empty?: ' + !numberInQueue);
        return !numberInQueue;
      },

      size: function () {
        console.log('There are ' + numberInQueue + ' in the Queue');
        return numberInQueue;
      }
    };

  }

  //Priority Queue, takes an object with an item and Priority number, lower gets
  //moved to the front of the line, insertion order is respected if the same
  //priority
  function PriorityQueue() {
    var priorityLine = [],
      numInLine = 0;

    return {

      enqueue: function (item, priority) {
        var theItem = {item: item, priority: priority}, i;

        for (i = 0; i < priorityLine.length; i += 1) {
          if (theItem.priority < priorityLine[i].priority) {
            priorityLine.splice(i, 0, theItem);
            numInLine += 1;
            console.log('spliced in at middle', item);
            return priorityLine;
          }
        }

        priorityLine.push(theItem);
        numInLine += 1;
        console.log('addedtoEndofQ');
        return priorityLine;
      },

      print: function () {
        console.log(priorityLine);
      },

      size: function () {
        console.log('There are ' + numInLine + ' items in Queue.');
        return numInLine;
      },

      dequeue: function () {
        console.log(priorityLine[0] + ' is up and leaving the line.');
        return priorityLine.shift();
      },

      isEmpty: function () {
        return numInLine === 0;
      },

      peek: function () {
        return priorityLine[0];
      }

    };
  }

  //'Hot Potato' Queue, will iterate through the Q for x amount of rounds,
  //remove front of the Queue, add to the end, on completion of round count
  //the first item will be removed from the Queue
  function CircularQueue () {
    var theList = [],
      lengthOfCircQ = 0;

    this.enqueue = function () {
      var i;
      for (i = 0; i < arguments.length; i += 1) {
        theList.push(arguments[i]);
        lengthOfCircQ += 1;
      }
      return theList;
    };

    this.dequeue = function () {
      lengthOfCircQ -= 1;
      return theList.shift();
    };

    this.queueRounds = function (num) {
      var j;

      for (j = 0; j < num; j += 1) {
        theList.push(theList.shift());
      }

      console.log(theList[0] + ' has been removed.');
      lengthOfCircQ -= 1;
      return theList.shift();
    };

    this.size = function () {
      return lengthOfCircQ;
    };
  }

  var prioQ = new PriorityQueue(),
    simpleQ = new Queue(),
    roundQ = new CircularQueue();

  prioQ.enqueue('loller', 2);
  prioQ.enqueue('testalest', 3);
  prioQ.enqueue('first', 1);
  prioQ.enqueue('second', 1);
  prioQ.print();
  console.log('-----END PRIORITY QUEUE-----');

  simpleQ.enqueue('Rob', 'Rob2', 'Rob3');
  simpleQ.enqueue('John');
  simpleQ.enqueue('Lol');
  console.log('-------------');
  simpleQ.front();
  simpleQ.size();
  simpleQ.isEmpty();
  simpleQ.size();
  simpleQ.dequeue();
  simpleQ.size();
  console.log('-----END REGULAR QUEUE-----');

  roundQ.enqueue('Person1', 'Person2', 'Person3', 'Person4');
  console.log(roundQ.size());
  roundQ.queueRounds(3);
  console.log(roundQ.size());
  roundQ.queueRounds(8);
  console.log(roundQ.size());

}());