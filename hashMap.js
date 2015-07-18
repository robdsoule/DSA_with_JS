(function () {
  "use strict";

  var Hash, hash1;


  Hash = function () {
    var loseLoseHashCode, table, length;

    length = 0;
    table = [];
    // private method: loseLoseHashCode(key) takes the key value and adds
    // the character value of each character in the key up and sets hash
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

    return {
      // put(key, value) adds a new item to the hash table(or update it)
      put: function (key, value) {
        var position;
        position = loseLoseHashCode(key);
        table[position] = value;
        length += 1;
        return table;
      },

      // remove(key) removes the value from the hash table using the key
      remove: function (key) {
        var position;
        position = loseLoseHashCode(key);
        if (table[position] !== undefined) {
          table[position] = undefined;
          length -= 1;
        }
      },

      // get(key) returns a specific value searched by the key
      get: function (key) {
        var position;
        position = loseLoseHashCode(key);
        return table[position];
      },

      //TODO handle collisions / multiple same hash values

      // print method prints all non undefined values to console
      print: function () {
        var i, len;
        len = table.length;

        for (i = 0; i < len; i += 1) {
          if (table[i] !== undefined) {
            console.log(i + ": " + table[i]);
          }
        }
      }

    };
  };

  hash1 = new Hash();
  hash1.put("Nanner", "Nanner1");
  hash1.put("Loller3", "baller");
  hash1.put("John", "snowyPants");
  hash1.put("Roofle", "Goofle");
  console.log('Post Addition: ', hash1.get("Loller3"));
  console.log('Pre Remove: ');
  hash1.print();
  hash1.remove("Nanner");
  console.log('After Remove: ');
  hash1.print();
}());