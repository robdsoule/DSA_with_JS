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
      var index, current, node;

      index = 0;
      node = new Node(element);
      current = head;
      if (!head) {
        head = node;
        tail = node;
        length += 1;
      } else {
        while (index < length) {
          current = current.next;
          index += 1;
        }
        node.prev = current;
        node.next = head;
        current.next = node;
        length += 1;
        tail = node;
      }

    };

    this.getHead = function () {
      return head;
    };
  }

  var hotPotato = new CircularLinkedList();
  hotPotato.append('Rob1');
  hotPotato.append('Rob2');
  hotPotato.append('Rob3');
}());