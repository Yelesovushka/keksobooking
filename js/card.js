'use strict';

// отрисовка карточки на карте

(function () {
  var featuresList = document.querySelectorAll('.feature');

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

  function fillFeatures(features, card) {
    for (var i = 0; i < featuresList.length; i++) {
      featuresList[i].classList.add('hidden');
    }

    for (var j = 0; j < features.length; j++) {
      card.querySelector('.popup__feature--' + features[j]).classList.remove('hidden');
    }
  }

  function fillPhotos(photos, card) {
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
      var card = document.querySelector('.popup');
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

      card.classList.remove('hidden');

      return card;
    }
  };
})();
