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

    this.getHead = function () {
      return head;
    };
  }

  var hotPotato = new CircularLinkedList();
  hotPotato.append('Rob1');
  hotPotato.append('Rob2');
  hotPotato.append('Rob3');
  console.log(hotPotato.getHead());
}());