(function () {
  "use strict";

  var Set;

  Set = function() {
    var items;

    items = {};

    return {
      // add a value to the set if it doesn't already exist, return true if
      // added
      add: function(value) {
        var added = false;
        if (!this.has(value)) {
          items[value] = value;
          added = true;
        }
        return added;
      },

      // remove a value from the set if it exists, return true if removed
      remove: function(value) {
        var deleted = false;
        if (this.has(value)) {
          delete items[value];
          deleted = true;
        }
        return deleted;
      },

      // returns true if the value exists in the set
      has: function(value) {
        return value in items;
      },

      // clear any items in the set by re-assigning items to an empty {}
      clearSet: function() {
        items = {};
      },

      // returns the number of items in the set
      size: function() {
        return Object.keys(items).length();
      },

      // values returns an array with all values in the set
      values: function() {
        return Object.keys(items);
      },

      //TODO union returns a new set with all items from set and otherSet
      union: function(otherSet) {

      },

      //TODO returns items that are in set but not in otherSet
      difference: function(otherSet) {

      },

      //TODO returns only items in both set and otherSet
      intersection: function(otherSet) {

      },

      //TODO returns true if set items is completely contained within otherSet
      subset: function(otherSet) {

      }

    }
  };

  var setA = new Set();
  setA.add('Hi');
  setA.add('Bye');
  setA.add('Nanner');
  console.log(setA.values());
  setA.remove('Lol');
  setA.remove('Bye');
  console.log(setA.values());
}());