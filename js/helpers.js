'use strict';

(function () {
  var activePin;

  window.helpers = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    changeActivePin: function (elem) {
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
      if (elem) {
        elem.classList.add('map__pin--active');
      }
      activePin = elem;
    },

    getNumber: function (x, base) {
      return parseInt(x, base);
    }
  };
})();
