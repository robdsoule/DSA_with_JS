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

  function PriorityQueue() {
    var priorityLine = [];

    return {

      enqueue: function (item, priority) {
        var theItem = {item: item, priority: priority}, i;

        for (i = 0; i < priorityLine.length; i += 1) {
          if (theItem.priority < priorityLine[i].priority) {
            priorityLine.splice(i, 0, theItem);
            console.log('spliced in at middle', item);
            return priorityLine;
          }
        }

        priorityLine.push(theItem);
        console.log('addedtoEndofQ');
        return priorityLine;
      },

      print: function () {
        console.log(priorityLine);
      }

    };
  }

  var prioQ = new PriorityQueue(),
    simpleQ = new Queue();
  prioQ.enqueue('loller', 2);
  prioQ.enqueue('testalest', 3);
  prioQ.enqueue('first', 1);
  prioQ.enqueue('second', 1);
  prioQ.print();

  simpleQ.enqueue('Rob', 'Rob2', 'Rob3');
  simpleQ.enqueue('John');
  simpleQ.enqueue('Lol');
  console.log('-------------');
  simpleQ.front();
  simpleQ.size();
  simpleQ.isEmpty();

  simpleQ.dequeue();
  simpleQ.dequeue();
  simpleQ.dequeue();
  simpleQ.size();
  simpleQ.isEmpty();
  simpleQ.dequeue();
  simpleQ.size();
  console.log('-----END REGULAR QUEUE-----');
}());
