'use strict';

var TYPE_LIVING_ROOM = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEAUTURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var COUNT = 8;
var map = document.querySelector('.map');
var mapPin = document.querySelector('.map__pin');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createPin() {
  var locationY = getRandomNumber(-250, 200);
  var locationX = getRandomNumber((-map.offsetWidth / 2), (map.offsetWidth / 2) - 50);

  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'
    },
    offer: {
      title: '',
      address: locationX + ', ' + locationY,
      price: getRandomNumber(1, 100),
      type: TYPE_LIVING_ROOM[getRandomNumber(0, 3)],
      rooms: getRandomNumber(1, 100),
      guests: getRandomNumber(0, 100),
      checkin: CHECK_TIME[getRandomNumber(0, 2)],
      checkout: CHECK_TIME[getRandomNumber(0, 2)],
      features: FEAUTURES,
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

  return pinElement;
}

function renderAllPins() {
  var fragment = document.createDocumentFragment();
  var allPins = createPinsArr();

  for (var i = 0; i < allPins.length; i++) {
    fragment.appendChild(renderPin(allPins[i]));
  }

  mapPin.appendChild(fragment);
}

map.classList.remove('map--faded');

renderAllPins();
