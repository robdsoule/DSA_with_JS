(function () {
  "use strict";

  var Dictionary, dicA, dicB;

  Dictionary = function () {
    var items;

    items = {};

    return {
      //TODO add a key value pair to the Set
      assign: function (key, value) {
      },

      //TODO returns true if the set has the given key
      has: function (key) {

      },

      //TODO removes the key value pair given returns true if removed
      remove: function (key) {

      },

      //TODO returns the specific value that matches the key
      retrieve: function (key) {

      },

      // resets the set
      clear: function () {
        items = {};
      },

      // returns number of key value pairs in the set
      size: function () {
        return Object.keys(items).length;
      },

      //TODO returns keys of the set in an array
      keys: function () {

      },

      //TODO returns values of the set in an array
      values: function () {

      }

    };
  };

}());