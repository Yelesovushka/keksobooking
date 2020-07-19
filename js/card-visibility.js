'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var MAIN_BUTTON_CODE = 0;
  var card = document.querySelector('.popup');
  var popupClose = card.querySelector('.popup__close');

  window.cardVisibility = {
    show: function (evt) {
      card.classList.remove('hidden');
      window.pins.changeActivePin(evt.currentTarget);
      popupClose.addEventListener('click', window.cardVisibility.onCloseClick);
    },

    onEscape: function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        window.cardVisibility.hide();
      }
    },

    onCloseClick: function (evt) {
      if (evt.button === MAIN_BUTTON_CODE) {
        window.cardVisibility.hide();
      }
    },

    hide: function () {
      card.classList.add('hidden');
      window.pins.changeActivePin();

      popupClose.removeEventListener('click', window.cardVisibility.onCloseClick);
      document.removeEventListener('keydown', window.cardVisibility.onEscape);
    }
  };
})();
