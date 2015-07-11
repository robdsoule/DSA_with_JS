(function () {
  "use strict";

  function CircularLinkedList () {
    var head, length, tail;

    function Node(element) {
      this.element = element;
      this.prev = null;
      this.next = null;
    }

    head = null;
    tail = null;
    length = 0;

    this.append = function (element) {
      var current, node;

      node = new Node(element);
      if (head === null) {
        head = node;
      } else {
        current = head;
        while (current.next && current.next !== head) {
          current = current.next;
        }
        node.prev = current;
        current.next = node;
        tail = node;
        tail.next = head;
        head.prev = tail;
      }
      length += 1;

    };

    this.indexOf = function (element) {
      var current, index, elementFound;

      elementFound = false;
      current = head;
      index = 0;

      if (element === current.element) {
        elementFound = true;
      } else {
        while (index < length && elementFound === false) {
          current = current.next;
          index += 1;
          if (element === current.element) {
            elementFound = true;
          }
        }
      }
      if (!elementFound) {
        index = null;
      }

      return index;
    };

    this.insertAt = function (position, element) {
      var current, previous, index, node;

      index = 0;
      current = head;
      node = new Node(element);

      if (position > -1 && position <= length) {
        if (position === 0) {
          node.next = current;
          head = node;
          tail.next = head;
          head.prev = tail;
        } else if (position === length) {
          this.append(element);
        } else {
          while (index < position) {
            previous = current;
            current = current.next;
            index += 1;
          }
          previous.next = node;
          current.prev = node;
          node.prev = previous;
          node.next = current;
        }
        length += 1;
      }
    };

    this.removeAt = function (position) {
      var current, future, previous, index, removedEle;
      index = 0;
      current = head;

      if (position > -1 && position < length) {
        if (position === 0) {
          head = current.next;
          head.prev = tail;
          tail.next = head;
        } else if (position === length - 1) {
          previous = tail.prev;
          previous.next = head;
          tail = previous;
          head.prev = tail;
        } else {
          while (index < position) {
            previous = current;
            current = current.next;
            index += 1;
          }
          future = current.next;
          future.prev = previous;
          previous.next = future;
        }
        length -= 1;
      }
    };

    this.size = function () {
      return length;
    };

    this.isEmpty = function () {
      return length === 0;
    };

    this.getHead = function () {
      return head;
    };

    this.getTail = function () {
      return tail;
    };
  }

  var hotPotato = new CircularLinkedList();
  hotPotato.append('Rob1');
  hotPotato.append('Rob2');
  hotPotato.append('Rob3');
  hotPotato.insertAt(3, 'Nanner');
  hotPotato.insertAt(1, 'Test');
  hotPotato.insertAt(0, 'Begin');
  hotPotato.removeAt(4);
  console.log(hotPotato.getHead());
  console.log('Index Of: ',
              hotPotato.indexOf('Rob3'),
              hotPotato.indexOf('Rob4'),
              hotPotato.indexOf('Rob1'));
}());