(function () {
  "use strict";

  var Set;

  Set = function() {
    var items;

    items = {};

    return {
      //TODO add a value to the set if it doesn't already exist, return true if added
      add: function(value) {

      },

      //TODO remove a value from the set if it exists, return true if removed
      remove: function(value) {

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

      //TODO values returns an array with all values in the set
      values: function() {

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
}());