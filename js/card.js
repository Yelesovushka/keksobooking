'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
        .content
        .querySelector('.map__card');
  var card = cardTemplate.cloneNode(true);
  var featuresList = card.querySelectorAll('.popup__feature');
  var Types = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  function renderCard() {
    var map = document.querySelector('.map');
    var filterContainer = document.querySelector('.map__filters-container');

    card.classList.add('hidden');
    map.insertBefore(card, filterContainer);
  }

  function fillFeatures(features) {
    for (var i = 0; i < featuresList.length; i++) {
      featuresList[i].classList.add('hidden');
    }

    for (var j = 0; j < features.length; j++) {
      card.querySelector('.popup__feature--' + features[j]).classList.remove('hidden');
    }
  }

  function fillPhotos(photos) {
    var popupPhotos = card.querySelector('.popup__photos');
    popupPhotos.innerHTML = '';

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

  window.card = {
    fillCard: function (pin) {
      var title = card.querySelector('.popup__title');
      var description = card.querySelector('.popup__description');

      card.querySelector('.popup__text--address').textContent = pin.offer.address;
      card.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
      card.querySelector('.popup__type').textContent = Types[pin.offer.type];
      card.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' ' + window.translate.setEndForRooms(pin.offer.rooms) + ' для ' + pin.offer.guests + ' ' + window.translate.setEndForGuests(pin.offer.guests);
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
      card.querySelector('.popup__avatar').src = pin.author.avatar;

      fillFeatures(pin.offer.features, card);
      fillPhotos(pin.offer.photos, card);
      fillElement(pin.offer.title, title, 'textContent');
      fillElement(pin.offer.description, description, 'textContent');

      card.classList.remove('hidden');

      return card;
    }
  };

  renderCard();
})();
