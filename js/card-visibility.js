'use strict';

// поведение карточки
(function () {
  var card = document.querySelector('.popup');
  var popupClose = card.querySelector('.popup__close');

  window.cardVisibility = {
    show: function (evt) {
      card.classList.remove('hidden');
      window.pins.changeActivePin(evt.currentTarget);
      popupClose.addEventListener('click', window.cardVisibility.onCloseClick);
    },

    onEscape: function(evt) {
      if (evt.keyCode === 27) {
        window.cardVisibility.hide();
      }
    },

    onCloseClick: function(evt) {
      if(evt.button === 0) {
        window.cardVisibility.hide();
      }
    },

    hide: function (evt) {
        card.classList.add('hidden');
        window.pins.changeActivePin();

      popupClose.removeEventListener('click', window.cardVisibility.onCloseClick);
      document.removeEventListener('keydown', window.cardVisibility.onEscape);
    }
  };
})();
