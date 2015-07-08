(function () {
  "use strict";

  function BiDirectionList() {
    var length, head, Node;

    length = 0;
    head = null;

    Node = function Node(element) {
      this.element = element;
      this.next = null;
      this.previous = null;
    };

    this.append = function (element) {
      var current, node;

      node = new Node(element);

      if (head === null) {
        head = node;
      } else {
        current = head;
        while (current.next) {
          current = current.next;
        }
        node.previous = current;
        current.next = node;
      }
      length += 1;

    };

    this.removeAt = function (position) {
      var current, previous, next, index, removedElement;

      current = head;
      index = 0;

      if (position > -1 && position < length) {
        if (position === 0) {
          head = current.next;
          head.previous = null;
          removedElement = current.element;
          length -= 1;
        } else {

          while (index < position) {
            index += 1;
            previous = current;
            current = current.next;
          }

          next = current.next;
          if (next) {
            next.previous = previous;
          }
          previous.next = next;
          removedElement = current.element;
          length -= 1;
        }
      } else {
        removedElement = null;
      }

      return removedElement;
    };

    this.insertAt = function (element, position) {
      var node, previous, current, index, wasInserted;
      wasInserted = false;
      index = 0;
      current = head;

      if (position > -1 && position <= length) {
        node = new Node(element);

        if (position === 0) {
          current.previous = node;
          node.next = current;
          head = node;
          wasInserted = true;
          length += 1;
        } else {

          while (index < position) {
            previous = current;
            current = current.next;
            index += 1;
          }

          node.next = current;
          previous.next = node;
          node.previous = previous;
          wasInserted = true;
          length += 1;
        }
      }

      return wasInserted;
    };

    this.indexOf = function (element) {
      var current, index, eleFound;
      index = 0;
      eleFound = false;
      current = head;

      if (head.element === element) {
        eleFound = true;
      } else {
        while (!eleFound && current.next) {
          current = current.next;
          if (current.element === element) {
            eleFound = true;
          }
          index += 1;
        }
      }
      if (!eleFound) {
        index = null;
      }

      return index;
    };

    this.toString = function () {
      var current, index, output;
      current = head;
      output = 'BEGINNING:\n';
      index = 0;

      while (index < length) {
        output += index + ' : ' + current.element + '\n';
        current = current.next;
        index += 1;
      }

      return output.trim();
    };

    this.getHead = function () {
      return head;
    };

    this.isEmpty = function () {
      return length === 0;
    };

    this.size = function () {
      return length;
    };

  }

  var twoWayList = new BiDirectionList();

  twoWayList.append('Item1');
  twoWayList.append('Item2');
  twoWayList.append('Item3');
  console.log(twoWayList.removeAt(2));
  twoWayList.insertAt('Inserted Elem', 0);
  twoWayList.insertAt('Another Inserted Ele', 3);
  console.log(twoWayList.indexOf('Another Inserted Ele'));
  console.log(twoWayList.indexOf('Shouldnt be here'));
  console.log(twoWayList.getHead());
  console.log(twoWayList.toString());

}());