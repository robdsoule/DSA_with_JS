(function () {
  "use strict";
  var LL = require("./linked_lists"),
    Hash,
    hash1;

  Hash = function () {
    var ValuePair, loseLoseHashCode, table;

    table = [];
    // private method: loseLoseHashCode(key) takes the key value and adds
    // the character value of each character in the key up and sets hash
    // note: loseLose is a horrible hash function
    loseLoseHashCode = function (key) {
      var hash, i, len;
      len = key.length;
      // make sure to set hash to 0 oops
      hash = 0;

      for (i = 0; i < len; i += 1) {
        hash += key.charCodeAt(i);
      }

      // arbitrary number
      return hash % 37;
    };

    ValuePair = function (key, value) {
      return {
        key: key,
        value: value
      };
    };

    return {
      // put(key, value) adds a new item to the hash table(or update it)
      // modified to account for multiple values with separate chaining
      put: function (key, value) {
        var position, newElement;

        newElement = new ValuePair(key, value);
        position = loseLoseHashCode(key);

        if (table[position] === undefined) {
          table[position] = new LL.LinkedList();
        }
        table[position].append(newElement);
        return newElement;
      },

      // remove(key) removes the value from the hash table using the key
      remove: function (key) {
        var position, indexNum;

        position = loseLoseHashCode(key);

        if (table[position] !== undefined) {
          indexNum = table[position].indexOf(key);
          if (indexNum !== undefined) {
            table[position].removeAt(indexNum);
          }
        }
        if (table[position].size() === 0) {
          table[position] = undefined;
        }
      },

      // get(key) returns a specific value searched by the key
      get: function (key) {
        var position, current, theElement;

        position = loseLoseHashCode(key);

        if (table[position] !== undefined) {
          current = table[position].getHead();

          while (current.next && theElement === undefined) {
            if (current.element.key === key) {
              theElement = current.element.value;
            }
            current = current.next;
          }

          if (current.element.key === key && theElement === undefined) {
            theElement = current.element.value;
          }
        }
        return theElement;
      },

      // print method prints all non undefined values to console
      print: function (optionalMsg) {
        var i, len;
        len = table.length;

        if (optionalMsg) {
          console.log(optionalMsg);
        }

        for (i = 0; i < len; i += 1) {
          if (table[i] !== undefined) {
            console.log(i + ": " + table[i].toStringT());
          }
        }
      }

    };
  };

  hash1 = new Hash();
  console.log(hash1.put("Nanner", "Nanner1"));
  hash1.put("Loller3", "baller");
  hash1.put("nhoJ", "roflShirt");
  hash1.put("John", "snowyPants");
  hash1.put("Roofle", "Goofle");
  console.log('Post Addition: ', hash1.get("nhoJ"));
  hash1.print('Pre Remove:');
  hash1.remove("Nanner");
  hash1.print('After Remove:');
  hash1.remove("nhoJ");
  hash1.print('After 2nd Remove:');
}());