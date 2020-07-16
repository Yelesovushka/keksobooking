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

  function showPage() {
    showFields('fieldset');
    getAddressPin();
    window.pins.loadPins();
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    mainPin.removeEventListener('mousedown', showPage);
    mainPin.removeEventListener('keydown', showPage);
  }

  function onPageClick(evt) {
    if (evt.button === 0) {
      showPage();
    }
  }

  function onPageKeydown(evt) {
    if (evt.key === 'Enter') {
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
    addressInput.value = (window.helpers.getNumber(mainPin.style.left, 10) + Math.round(ROUND_PIN_SIZE / 2)) + ', ' + (window.helpers.getNumber(mainPin.style.top, 10) + Math.round(ROUND_PIN_SIZE / 2));
  }

  window.page = {
    reset: function () {
      mainPin.style.top = '375px';
      mainPin.style.left = '570px';
      hideElements();
      getAddressRoundPin();
      window.pins.resetPins();
      window.helpers.hideElement(document.querySelector('.map__card'));
      adForm.classList.add('ad-form--disabled');
      map.classList.add('map--faded');
      mainPin.addEventListener('mousedown', showPage);
      mainPin.addEventListener('keydown', showPage);
    }
  };

  hideElements('fieldset');
  getAddressRoundPin();

  mainPin.addEventListener('mousedown', onPageClick);
  mainPin.addEventListener('keydown', onPageKeydown);
})();
