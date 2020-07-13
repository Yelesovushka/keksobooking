'use strict';

// поведение страницы

(function () {
  var ROUND_PIN_SIZE = 65;
  var HEIGHT_PIN = 87;
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  function getAddressPin() {
    addressInput.value = (window.helpers.getNumber(mainPin.style.left, 10) + Math.round(ROUND_PIN_SIZE / 2)) + ', ' + (window.helpers.getNumber(mainPin.style.top, 10) + HEIGHT_PIN);
  }

  function showFields(tag) {
    var elem = document.querySelectorAll(tag);
    for (var i = 0; i < elem.length; i++) {
      elem[i].removeAttribute('disabled', '');
    }
  }

  function showPage(evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      showFields('fieldset');
      getAddressPin();
      window.pins.renderAllPins();
      adForm.classList.remove('ad-form--disabled');
      map.classList.remove('map--faded');
      mainPin.removeEventListener('mousedown', showPage);
      mainPin.removeEventListener('keydown', showPage);
    }
  }

  function hideElements(tag) {
    var elem = document.querySelectorAll(tag);
    for (var i = 0; i < elem.length; i++) {
      elem[i].setAttribute('disabled', '');
    }
  }

  function getAddressRoundPin() {
    addressInput.value = (window.helpers.getNumber(mainPin.style.left, 10) + Math.round(ROUND_PIN_SIZE / 2)) + ', ' + (window.helpers.getNumber(mainPin.style.top, 10) + Math.round(ROUND_PIN_SIZE / 2));
  }

  hideElements('fieldset');
  getAddressRoundPin();

  mainPin.addEventListener('mousedown', showPage);
  mainPin.addEventListener('keydown', showPage);
})();
