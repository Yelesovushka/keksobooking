'use strict';

var TYPE_LIVING_ROOM = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEAUTURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var COUNT = 8;
var ROUND_PIN_SIZE = 65;
var HEIGHT_PIN = 87;
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var addressInput = document.querySelector('#address');
var activePin;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createPin() {
  var locationY = getRandomNumber(130, 560);
  var locationX = getRandomNumber(0, map.offsetWidth - 70);

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

function changeActivePin(elem) {
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
  if (elem) {
    elem.classList.add('map__pin--active');
  }
  activePin = elem;
}

function renderPin(pin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x + 25 + 'px';
  pinElement.style.top = pin.location.y + 70 + 'px';

  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  pinElement.addEventListener('click', function () {
    renderCard(pin);
    changeActivePin(pinElement);
  });

  return pinElement;
}

function renderAllPins() {
  var fragment = document.createDocumentFragment();
  var allPins = createPinsArr();

  for (var i = 0; i < allPins.length; i++) {
    fragment.appendChild(renderPin(allPins[i]));
  }

  mapPins.appendChild(fragment);
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

function setType(pin) {
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

  return type;
}

function createCard(pin) {
  if (pin.cardNode) {
    var card = pin.cardNode;
  } else {
    var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');
    card = cardTemplate.cloneNode(true);
    pin.cardNode = card;
  }

  return card;
}

function fillCard(pin) {
  var card = createCard(pin);

  var title = card.querySelector('.popup__title');
  var description = card.querySelector('.popup__description');
  var popupClose = card.querySelector('.popup__close');

  card.querySelector('.popup__text--address').textContent = pin.offer.address;
  card.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = setType(pin);
  card.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' ' + setEndForRooms(pin.offer.rooms) + ' для ' + pin.offer.guests + ' ' + setEndForGuests(pin.offer.guests);
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
  card.querySelector('.popup__avatar').src = pin.author.avatar;

  fillFeatures(pin.offer.features, card);
  fillPhotos(pin.offer.photos, card);
  fillElement(pin.offer.title, title, 'textContent');
  fillElement(pin.offer.description, description, 'textContent');

  card.classList.remove('hidden');

  popupClose.addEventListener('click', function () {
    card.classList.add('hidden');
    changeActivePin();
  });

  return card;
}

function renderCard(pin) {
  var filterContainer = document.querySelector('.map__filters-container');
  var card = fillCard(pin);

  map.insertBefore(card, filterContainer);
}

function hideElements(tag) {
  var elem = document.querySelectorAll(tag);
  for (var i = 0; i < elem.length; i++) {
    elem[i].setAttribute('disabled', '');
  }
}

function showFields(tag) {
  var elem = document.querySelectorAll(tag);
  for (var i = 0; i < elem.length; i++) {
    elem[i].removeAttribute('disabled', '');
  }
}

function getNumber(x, base) {
  return parseInt(x, base);
}

function getAddressRoundPin() {
  addressInput.value = (getNumber(mainPin.style.left, 10) + Math.round(ROUND_PIN_SIZE / 2)) + ', ' + (getNumber(mainPin.style.top, 10) + Math.round(ROUND_PIN_SIZE / 2));
}

function getAddressPin() {
  addressInput.value = (getNumber(mainPin.style.left, 10) + Math.round(ROUND_PIN_SIZE / 2)) + ', ' + (getNumber(mainPin.style.top, 10) + HEIGHT_PIN);
}

function showPage(evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    showFields('fieldset');
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    getAddressPin();
    renderAllPins();
    mainPin.removeEventListener('mousedown', showPage);
    mainPin.removeEventListener('keydown', showPage);
  }
}

hideElements('fieldset');
getAddressRoundPin();

mainPin.addEventListener('mousedown', showPage);
mainPin.addEventListener('keydown', showPage);

// валидация данных ввода, временно выделила отдельно эту часть кода для удобства, позднее сгруппирую

var titleInput = document.querySelector('#title');
var priceInput = document.querySelector('#price');
var typeInput = document.querySelector('#type');
var roomInput = document.querySelector('#room_number');
var guestInput = document.querySelector('#capacity');
var checkinInput = document.querySelector('#timein');
var checkoutInput = document.querySelector('#timeout');
var inputs = adForm.querySelectorAll('input, select');
var submitBtn = adForm.querySelector('.ad-form__submit');

function syncRoomAndGuestInputs() {
  if (roomInput.value === '1' && guestInput.value !== '1') {
    roomInput.setCustomValidity('1 комната для 1 гостя');
  } else if (roomInput.value === '2' && guestInput.value !== '1' && guestInput.value !== '2') {
    roomInput.setCustomValidity('2 комнаты для 1 или 2 гостей');
  } else if (roomInput.value === '3' && guestInput.value === '100') {
    roomInput.setCustomValidity('3 комнаты для 1, 2 или 3 гостей');
  } else if (roomInput.value === '100' && guestInput.value !== '0') {
    roomInput.setCustomValidity('100 комнат не для гостей');
  } else {
    roomInput.setCustomValidity('');
  }

  if (guestInput.value === '1' && roomInput.value === '100') {
    guestInput.setCustomValidity('Для 1 гостя - 1, 2 или 3 комнаты');
  } else if (guestInput.value === '2' && roomInput.value !== '2' && roomInput.value !== '3') {
    guestInput.setCustomValidity('Для 2 гостей - 2 или 3 комнаты');
  } else if (guestInput.value === '3' && roomInput.value !== '3') {
    guestInput.setCustomValidity('Для 3 гостей - 3 комнаты');
  } else if (guestInput.value === '0' && roomInput.value !== '100') {
    guestInput.setCustomValidity('100 комнат не для гостей');
  } else {
    guestInput.setCustomValidity('');
  }
}

function checkValidity() {
  var input;
  var errorsNumber = 0;

  for (var i = 0; i < inputs.length; i++) {
    input = inputs[i];
    if (input.checkValidity() === false) {
      input.style.borderColor = 'red';
      errorsNumber++;
    } else {
      input.style.borderColor = '#d9d9d3';
    }
  }

  if (errorsNumber === 0) {
    adForm.submit();
  }
}

function onSubmitClick(evt) {
  evt.preventDefault();
  checkValidity();
}

function setMinPriceOnRoom() {
  var minPrice;

  switch (typeInput.value) {
    case 'flat':
      minPrice = 1000;
      break;
    case 'bungalo':
      minPrice = 0;
      break;
    case 'house':
      minPrice = 5000;
      break;
    default:
      minPrice = 10000;
  }

  return minPrice;
}

titleInput.addEventListener('invalid', function () {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное для заполнения поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

titleInput.addEventListener('input', function () {
  var valueLength = titleInput.value.length;
  var minLength = titleInput.minLength;
  var maxLength = titleInput.maxLength;

  if (valueLength < minLength) {
    titleInput.setCustomValidity('Введите еще ' + (minLength - valueLength) + ' символов');
  } else if (valueLength > maxLength) {
    titleInput.setCustomValidity('Удалите ' + (valueLength - maxLength) + ' символов');
  } else {
    titleInput.setCustomValidity('');
  }
});

typeInput.addEventListener('change', function () {
  priceInput.placeholder = setMinPriceOnRoom();
});

priceInput.addEventListener('invalid', function () {
  if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Обязательное для заполнения поле');
  } else {
    priceInput.setCustomValidity('');
  }
});

priceInput.addEventListener('input', function () {
  var value = priceInput.value;
  var max = priceInput.max;
  var min = setMinPriceOnRoom();

  if (value > max) {
    priceInput.setCustomValidity('Максимальная цена превышена на ' + (value - max));
  } else if (value < min) {
    priceInput.setCustomValidity('Минимальная цена занижена на ' + (min - value));
  } else {
    priceInput.setCustomValidity('');
  }
});


checkinInput.addEventListener('change', function () {
  if (checkinInput.value === '12:00') {
    checkoutInput.value = '12:00';
  } else if (checkinInput.value === '13:00') {
    checkoutInput.value = '13:00';
  } else {
    checkoutInput.value = '14:00';
  }
});

checkoutInput.addEventListener('change', function () {
  if (checkoutInput.value === '12:00') {
    checkinInput.value = '12:00';
  } else if (checkoutInput.value === '13:00') {
    checkinInput.value = '13:00';
  } else {
    checkinInput.value = '14:00';
  }
});

roomInput.addEventListener('change', syncRoomAndGuestInputs);
guestInput.addEventListener('change', syncRoomAndGuestInputs);
submitBtn.addEventListener('click', onSubmitClick);
