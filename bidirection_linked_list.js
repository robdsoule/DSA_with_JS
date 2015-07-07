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

    //TODO removeAt taking position parameter
    //TODO insertAt taking element and position parameters
    //TODO indexOf a specific element
    //TODO toString print list out in a legible manner

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
  console.log(twoWayList.getHead());
  console.log(twoWayList);

}());