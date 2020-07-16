'use strict';

// создание и отрисовка пинов

(function () {
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
  var activePin;

  function renderPin(pin) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x + 25 + 'px';
    pinElement.style.top = pin.location.y + 70 + 'px';

    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    pinElement.addEventListener('click', function (evt) {
      window.card.fillCard(pin);
      window.cardVisibility.show(evt, pinElement);
    });

    return pinElement;
  }

  function onLoadPins(pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }

    mapPins.appendChild(fragment);
  }

  function onError(errorMessage) {
    var message = document.createElement('div');
    message.style = 'z-index: 100; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; padding: 30px; text-align: center; font-size: 28px; color: white; border: 1px solid red; background-color: #fa9';
    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', message);
    window.setTimeout(function () {
      message.remove();
    }, 3000);
  }

  window.pins = {
    changeActivePin: function (elem) {
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
      if (elem) {
        elem.classList.add('map__pin--active');
      }
      activePin = elem;
    },
    loadPins: function () {
      window.backend.load(onLoadPins, onError);
    },
    resetPins: function () {
      var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      for (var i = 0; i < allPins.length; i++) {
        mapPins.removeChild(allPins[i]);
      }
    }
  };
})();
