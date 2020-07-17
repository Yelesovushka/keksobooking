'use strict';

// поведение карточки
(function () {
  var card = document.querySelector('.popup');
  var popupClose = card.querySelector('.popup__close');

  window.cardVisibility = {
    show: function (evt, elem) {
      if (evt.button === 0 || evt.keycode === 13) {
        card.classList.remove('hidden');
        window.pins.changeActivePin(elem);
        popupClose.addEventListener('click', window.cardVisibility.hide);
      }
    },

    hide: function (evt) {
      if (evt.button === 0 || evt.keyCode === 27) {
        card.classList.add('hidden');
        window.pins.changeActivePin();
      }

      popupClose.removeEventListener('click', window.cardVisibility.hide);
    }
  };
})();
