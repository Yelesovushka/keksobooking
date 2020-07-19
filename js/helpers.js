'use strict';

(function () {

  window.helpers = {
    hideElement: function (elem) {
      if (elem) {
        elem.classList.add('hidden');
      }
    }
  };
})();
