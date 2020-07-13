'use strict';

// создание и отрисовка пинов

(function () {
  var TYPE_LIVING_ROOM = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIME = ['12:00', '13:00', '14:00'];
  var FEAUTURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var COUNT = 8;
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
  var map = document.querySelector('.map');
  var activePin;

  function getRandomArrayValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getRandomArray(arr) {
    var count = window.helpers.getRandomNumber(1, arr.length);
    var randomArray = [];

    for (var i = 0; i < count; i++) {
      randomArray.push(getRandomArrayValue(arr));
    }

    return randomArray;
  }

  function createPin() {
    var locationY = window.helpers.getRandomNumber(130, 560);
    var locationX = window.helpers.getRandomNumber(0, map.offsetWidth - 70);

    return {
      author: {
        avatar: 'img/avatars/user0' + window.helpers.getRandomNumber(1, 8) + '.png'
      },
      offer: {
        title: '',
        address: locationX + ', ' + locationY,
        price: window.helpers.getRandomNumber(1, 100),
        type: TYPE_LIVING_ROOM[window.helpers.getRandomNumber(0, 3)],
        rooms: window.helpers.getRandomNumber(1, 100),
        guests: window.helpers.getRandomNumber(0, 100),
        checkin: CHECK_TIME[window.helpers.getRandomNumber(0, 2)],
        checkout: CHECK_TIME[window.helpers.getRandomNumber(0, 2)],
        features: getRandomArray(FEAUTURES),
        description: '',
        photos: PHOTOS,
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }

  function createPinsArr() {
    var pins = [];

    for (var i = 0; i < COUNT; i++) {
      pins.push(createPin());
    }

    return pins;
  }

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

  window.pins = {
    renderAllPins: function () {
      var fragment = document.createDocumentFragment();
      var allPins = createPinsArr();

      for (var i = 0; i < allPins.length; i++) {
        fragment.appendChild(renderPin(allPins[i]));
      }

      mapPins.appendChild(fragment);
    },

    changeActivePin: function (elem) {
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
      if (elem) {
        elem.classList.add('map__pin--active');
      }
      activePin = elem;
    }

  };
})();
