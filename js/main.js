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

function getRandomArrayValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomArray(arr) {
  var count = getRandomNumber(1, arr.length);
  var randomArray = [];

  for (var i = 0; i < count; i++) {
    randomArray.push(getRandomArrayValue(arr));
  }

  return randomArray;
}

function fillFeatures(features, card) {
  for (var i = 0; i < features.length; i++) {
    card.querySelector('.popup__feature--' + features[i]).classList.remove('hidden');
  }
}

function fillPhotos(photos, card) {
  var popupPhotos = card.querySelector('.popup__photos');

  for (var i = 0; i < photos.length; i++) {
    popupPhotos.insertAdjacentHTML('beforeend', '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
  }
}

function fillElement(value, elem, property) {
  if (!value.length) {
    elem.classList.add('hidden');
    return false;
  }
  elem[property] = value;
  return true;
}

function setEndForGuests(number) {
  var surplus = number % 10;
  if (surplus === 1) {
    return number === 11 ? 'гостей' : 'гостя';
  }
  return 'гостей';
}

function setEndForRooms(count) {
  var surplus = count % 10;
  if (surplus === 1) {
    return (count === 11) ? 'комнат' : 'комната';
  } else if (surplus >= 5) {
    return 'комнат';
  } else {
    return (count >= 12 && count <= 14 || surplus === 0) ? 'комнат' : 'комнаты';
  }
}

function createCard(pin) {
  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');
  var card = cardTemplate.cloneNode(true);
  var title = card.querySelector('.popup__title');
  var description = card.querySelector('.popup__description');
  var type;

  switch (pin.offer.type) {
    case 'flat':
      type = 'Квартира';
      break;
    case 'bungalo':
      type = 'Бунгало';
      break;
    case 'house':
      type = 'Дом';
      break;
    default:
      type = 'Дворец';
  }

  card.querySelector('.popup__text--address').textContent = pin.offer.address;
  card.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = type;
  card.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' ' + setEndForRooms(pin.offer.rooms) + ' для ' + pin.offer.guests + ' ' + setEndForGuests(pin.offer.guests);
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
  card.querySelector('.popup__avatar').src = pin.author.avatar;

  fillFeatures(pin.offer.features, card);
  fillPhotos(pin.offer.photos, card);
  fillElement(pin.offer.title, title, 'textContent');
  fillElement(pin.offer.description, description, 'textContent');

  return card;
}

function renderCard() {
  var filterContainer = document.querySelector('.map__filters-container');
  var card = createCard(createPinsArr()[0]);

  map.insertBefore(card, filterContainer);
}

map.classList.remove('map--faded');

renderAllPins();
renderCard();
