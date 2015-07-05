(function () {
  "use strict";

  function LinkedList() {
    var length, head, Node;

    length = 0;
    head = null;
    // Node type for any new item to add to the linked list
    Node = function (element) {
      this.element = element;
      this.next = null;
    };

    this.append = function (element) {
      var current, node;

      // uses Node constructor, to create an object with element given with an
      // element and next key
      node = new Node(element);

      // if head is null then it's at the end of the linked list
      // and sets head to the element being appended, for linking in future
      // appends
      if (head === null) {
        head = node;
      } else {
        current = head;
        // loops through until it hits a null .next since it is falsey
        // by assigning current to current.next it keeps iterating through the
        // list
        while (current.next) {
          current = current.next;
        }
        // after iterating until current.next is null it's at the end of the
        // linked list, so current.next will be assigned to the new element
        // making the new element the last item in the list, with default .next
        // val of null
        current.next = node;
      }
      length += 1;
    };

    this.removeAt = function (position) {
      var current, previous, index, removedElement;
      current = head;
      index = 0;

      //valid position check
      if (position > -1 && position < length) {
        // if it's first item in the list, head gets assigned as .next in
        // preparation of removing the first item
        if (position === 0) {
          head = current.next;
        } else {
          while (index < position) {
            index += 1;
            previous = current;
            current = current.next;
          }
          previous.next = current.next;
        }
        length -= 1;
        removedElement = current.element;
      } else {
        removedElement = null;
      }

      return removedElement;
    };

    //TODO add an insert method that takes a zero based position
    this.insert = function (value) {

    };

    this.toString = function () {
      var current, output, incr;
      output = '';
      incr = 0;

      if (head === null) {
        output += 'NULL';
      } else {
        current = head;
        while (current.next) {
          incr += 1;
          output += 'Item ' + incr + ': ' + current.element + '\n';
          current = current.next;
        }
        incr += 1;
        output += 'Item ' + incr + ': ' + current.element;
      }

      output += '\n---------\nEnd List';
      return output.trim();
    };

    this.indexOf = function (element) {
      var current, indexCount, eleFound;
      indexCount = 0;
      eleFound = false;

      try {
        if (element === head.element) {
          indexCount = 0;
        } else {
          current = head;
          while (current && !eleFound) {
            indexCount += 1;
            if (current.element === element) {
              eleFound = true;
            }
            current = current.next;
          }
        }
        if (eleFound === false) {
          throw "Error: " + element + " - not in list";
        }
      } catch (err) {
        console.log(err);
      }

      return indexCount;
    };

    this.isEmpty = function () {
      return length === 0;
    };

    this.size = function () {
      return length;
    };

  }

  var aLinkedList = new LinkedList(),
    anotherLinkedList = new LinkedList();

  console.log(anotherLinkedList.toString());

  aLinkedList.append('Item1');
  aLinkedList.append('Item2');
  aLinkedList.append('Item3');
  console.log('Index of Item 2:', aLinkedList.indexOf('Item4'));
  //aLinkedList.removeAt(2);
  console.log(aLinkedList.toString());
  console.log(aLinkedList);
}());