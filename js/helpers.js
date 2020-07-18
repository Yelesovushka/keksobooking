'use strict';

(function () {

  window.helpers = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    hideElement: function (elem) {
      if (elem) {
        elem.classList.add('hidden');
      }
    }
  };
})();
