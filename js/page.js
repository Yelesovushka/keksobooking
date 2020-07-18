'use strict';

(function () {
  var ROUND_PIN_SIZE = 65;
  var HEIGHT_PIN = 87;
  var MAIN_BUTTON_CODE = 0;
  var ENTER_KEY_CODE = 13;
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  function getAddressPin() {
    addressInput.value = (parseInt(mainPin.style.left, 10) + Math.round(ROUND_PIN_SIZE / 2)) + ', ' + (parseInt(mainPin.style.top, 10) + HEIGHT_PIN);
  }

  function showElements(tag) {
    var elem = document.querySelectorAll(tag);
    for (var i = 0; i < elem.length; i++) {
      elem[i].removeAttribute('disabled', '');
    }
  }

  function showPage() {
    showElements('fieldset');
    showElements('select');
    getAddressPin();
    window.pins.loadPins();
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    mainPin.removeEventListener('mousedown', onPageClick);
    mainPin.removeEventListener('keydown', onPageKeydown);
  }

  function onPageClick(evt) {
    if (evt.button === MAIN_BUTTON_CODE) {
      showPage();
    }
  }

  function onPageKeydown(evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      showPage();
    }
  }

  function hideElements(tag) {
    var elem = document.querySelectorAll(tag);
    for (var i = 0; i < elem.length; i++) {
      elem[i].setAttribute('disabled', '');
    }
  }

  function getAddressRoundPin() {
    addressInput.value = (parseInt(mainPin.style.left, 10) + Math.round(ROUND_PIN_SIZE / 2)) + ', ' + (parseInt(mainPin.style.top, 10) + Math.round(ROUND_PIN_SIZE / 2));
  }

  window.page = {
    reset: function () {
      mainPin.style.top = '375px';
      mainPin.style.left = '570px';
      hideElements('fieldset');
      hideElements('select');
      getAddressRoundPin();
      window.pins.resetPins();
      window.helpers.hideElement(document.querySelector('.map__card'));
      window.filters.reset();
      adForm.classList.add('ad-form--disabled');
      map.classList.add('map--faded');
      mainPin.addEventListener('mousedown', onPageClick);
      mainPin.addEventListener('keydown', onPageKeydown);
    }
  };

  hideElements('fieldset');
  hideElements('select');
  getAddressRoundPin();

  mainPin.addEventListener('mousedown', onPageClick);
  mainPin.addEventListener('keydown', onPageKeydown);
})();
