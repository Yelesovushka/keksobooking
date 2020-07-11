'use strict';

(function () {

  window.translate = {
    setEndForGuests: function (number) {
      var surplus = number % 10;
      if (surplus === 1) {
        return number === 11 ? 'гостей' : 'гостя';
      }
      return 'гостей';
    },

    setEndForRooms: function (count) {
      var surplus = count % 10;
      if (surplus === 1) {
        return (count === 11) ? 'комнат' : 'комната';
      } else if (surplus >= 5) {
        return 'комнат';
      } else {
        return (count >= 12 && count <= 14 || surplus === 0) ? 'комнат' : 'комнаты';
      }
    }
  };
})();
